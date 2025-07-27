from rest_framework import serializers
from .models import UploadedFile, FileShare
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UploadedFileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    file_size_display = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()
    
    class Meta:
        model = UploadedFile
        fields = [
            'id', 'user', 'file', 'original_filename', 'file_size', 
            'file_size_display', 'file_type', 'upload_date', 'description', 
            'is_public', 'download_url'
        ]
        read_only_fields = ['user', 'file_size', 'file_type', 'upload_date']
    
    def get_download_url(self, obj):
        request = self.context.get('request')
        if request and obj.file:
            return request.build_absolute_uri(obj.file.url)
        return None
    
    def get_file_size_display(self, obj):
        return obj.get_file_size_display()

class FileShareSerializer(serializers.ModelSerializer):
    file = UploadedFileSerializer(read_only=True)
    share_url = serializers.SerializerMethodField()
    
    class Meta:
        model = FileShare
        fields = [
            'id', 'file', 'share_token', 'created_date', 'expires_date',
            'download_count', 'max_downloads', 'share_url'
        ]
        read_only_fields = ['share_token', 'created_date', 'download_count']
    
    def get_share_url(self, obj):
        request = self.context.get('request')
        if request:
            return f"{request.build_absolute_uri('/')}api/share/{obj.share_token}"
        return None

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    description = serializers.CharField(required=False, allow_blank=True)
    is_public = serializers.BooleanField(default=False) 