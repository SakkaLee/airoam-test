from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from django.conf import settings
import os
import mimetypes
import uuid
from datetime import timedelta
from .models import UploadedFile, FileShare
from .serializers import (
    UploadedFileSerializer, 
    FileShareSerializer, 
    FileUploadSerializer
)
from django.utils import timezone

class FileUploadView(APIView):
    permission_classes = [AllowAny]  # 暂时允许匿名上传用于测试
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        """上传文件"""
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = request.FILES.get('file')
            if not uploaded_file:
                return Response({'error': '没有选择文件'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 检查文件大小 (限制为100MB)
            if uploaded_file.size > 100 * 1024 * 1024:
                return Response({'error': '文件大小不能超过100MB'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 检查文件类型
            allowed_types = [
                'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                'application/pdf', 'text/plain', 'text/csv',
                'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/zip', 'application/x-rar-compressed'
            ]
            
            if uploaded_file.content_type not in allowed_types:
                return Response({'error': '不支持的文件类型'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                # 创建文件记录
                # 如果没有用户，创建一个匿名用户或使用默认用户
                user = request.user if request.user.is_authenticated else User.objects.first()
                if not user:
                    # 创建一个默认用户
                    user = User.objects.create_user(
                        username='anonymous',
                        email='anonymous@example.com',
                        password='anonymous123'
                    )
                
                file_obj = UploadedFile.objects.create(
                    user=user,
                    file=uploaded_file,
                    original_filename=uploaded_file.name,
                    file_size=uploaded_file.size,
                    file_type=uploaded_file.content_type,
                    description=serializer.validated_data.get('description', ''),
                    is_public=serializer.validated_data.get('is_public', False)
                )
                
                file_serializer = UploadedFileSerializer(file_obj, context={'request': request})
                return Response({
                    'message': '文件上传成功',
                    'file': file_serializer.data
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({'error': f'上传失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """获取用户的文件列表"""
        files = UploadedFile.objects.filter(user=request.user)
        serializer = UploadedFileSerializer(files, many=True, context={'request': request})
        return Response({
            'files': serializer.data,
            'total_count': files.count()
        })

class FileDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, file_id):
        """获取文件详情"""
        try:
            file_obj = UploadedFile.objects.get(id=file_id, user=request.user)
            serializer = UploadedFileSerializer(file_obj, context={'request': request})
            return Response(serializer.data)
        except UploadedFile.DoesNotExist:
            return Response({'error': '文件不存在'}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, file_id):
        """删除文件"""
        try:
            file_obj = UploadedFile.objects.get(id=file_id, user=request.user)
            # 删除物理文件
            if file_obj.file and os.path.exists(file_obj.file.path):
                os.remove(file_obj.file.path)
            file_obj.delete()
            return Response({'message': '文件删除成功'})
        except UploadedFile.DoesNotExist:
            return Response({'error': '文件不存在'}, status=status.HTTP_404_NOT_FOUND)

class FileDownloadView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, file_id):
        """下载文件"""
        try:
            file_obj = UploadedFile.objects.get(id=file_id)
            
            # 检查权限
            if not file_obj.is_public and request.user != file_obj.user:
                return Response({'error': '没有权限访问此文件'}, status=status.HTTP_403_FORBIDDEN)
            
            if not file_obj.file or not os.path.exists(file_obj.file.path):
                return Response({'error': '文件不存在'}, status=status.HTTP_404_NOT_FOUND)
            
            # 返回文件
            response = FileResponse(open(file_obj.file.path, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{file_obj.original_filename}"'
            response['Content-Type'] = file_obj.file_type
            return response
            
        except UploadedFile.DoesNotExist:
            return Response({'error': '文件不存在'}, status=status.HTTP_404_NOT_FOUND)

class CreateShareView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, file_id):
        """创建文件分享链接"""
        try:
            file_obj = UploadedFile.objects.get(id=file_id, user=request.user)
            
            # 生成分享token
            share_token = str(uuid.uuid4())
            
            # 获取分享参数
            expires_days = request.data.get('expires_days', 7)
            max_downloads = request.data.get('max_downloads', None)
            
            # 创建分享记录
            share_obj = FileShare.objects.create(
                file=file_obj,
                share_token=share_token,
                expires_date=timezone.now() + timedelta(days=expires_days) if expires_days else None,
                max_downloads=max_downloads
            )
            
            serializer = FileShareSerializer(share_obj, context={'request': request})
            return Response({
                'message': '分享链接创建成功',
                'share': serializer.data
            }, status=status.HTTP_201_CREATED)
            
        except UploadedFile.DoesNotExist:
            return Response({'error': '文件不存在'}, status=status.HTTP_404_NOT_FOUND)

class ShareDownloadView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, share_token):
        """通过分享链接下载文件"""
        try:
            share_obj = FileShare.objects.get(share_token=share_token)
            
            # 检查分享是否过期
            if share_obj.is_expired():
                return Response({'error': '分享链接已过期'}, status=status.HTTP_410_GONE)
            
            file_obj = share_obj.file
            
            if not file_obj.file or not os.path.exists(file_obj.file.path):
                return Response({'error': '文件不存在'}, status=status.HTTP_404_NOT_FOUND)
            
            # 增加下载计数
            share_obj.download_count += 1
            share_obj.save()
            
            # 返回文件
            response = FileResponse(open(file_obj.file.path, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{file_obj.original_filename}"'
            response['Content-Type'] = file_obj.file_type
            return response
            
        except FileShare.DoesNotExist:
            return Response({'error': '分享链接无效'}, status=status.HTTP_404_NOT_FOUND)

class PublicFilesView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        """获取公开文件列表"""
        files = UploadedFile.objects.filter(is_public=True).select_related('user')
        serializer = UploadedFileSerializer(files, many=True, context={'request': request})
        return Response({
            'files': serializer.data,
            'total_count': files.count()
        }) 