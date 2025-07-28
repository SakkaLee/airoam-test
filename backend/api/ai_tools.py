import os
import json
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.conf import settings
import openai
from PIL import Image
import io
import base64

# 配置 OpenAI
openai.api_key = os.environ.get('OPENAI_API_KEY', '')

class TextGeneratorView(APIView):
    """智能文案生成器"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            prompt = request.data.get('prompt', '')
            style = request.data.get('style', 'creative')
            length = request.data.get('length', 'medium')
            
            if not prompt:
                return Response({'error': '请输入文案需求'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建系统提示
            system_prompt = f"""你是一个专业的文案创作专家。请根据用户需求创作{style}风格的文案，长度要求{length}。
            要求：
            1. 文案要有吸引力和说服力
            2. 符合目标受众的阅读习惯
            3. 突出产品/服务的核心价值
            4. 语言简洁明了，易于理解"""
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            generated_text = response.choices[0].message.content
            
            return Response({
                'success': True,
                'text': generated_text,
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002  # 估算成本
                }
            })
            
        except Exception as e:
            return Response({'error': f'生成失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImageGeneratorView(APIView):
    """AI 图像创作"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            prompt = request.data.get('prompt', '')
            size = request.data.get('size', '1024x1024')
            style = request.data.get('style', 'realistic')
            
            if not prompt:
                return Response({'error': '请输入图像描述'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建图像生成提示
            enhanced_prompt = f"{style} style: {prompt}, high quality, detailed, professional"
            
            # 调用 DALL-E API
            response = openai.Image.create(
                prompt=enhanced_prompt,
                n=1,
                size=size
            )
            
            image_url = response['data'][0]['url']
            
            return Response({
                'success': True,
                'image_url': image_url,
                'prompt': enhanced_prompt
            })
            
        except Exception as e:
            return Response({'error': f'图像生成失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CodeAssistantView(APIView):
    """代码助手"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            prompt = request.data.get('prompt', '')
            language = request.data.get('language', 'python')
            task = request.data.get('task', 'generate')
            
            if not prompt:
                return Response({'error': '请输入代码需求'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建代码生成提示
            system_prompt = f"""你是一个专业的{language}开发专家。请根据用户需求生成高质量的代码。
            要求：
            1. 代码要符合{language}的最佳实践
            2. 包含详细的注释说明
            3. 考虑错误处理和边界情况
            4. 代码要简洁高效"""
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            
            generated_code = response.choices[0].message.content
            
            return Response({
                'success': True,
                'code': generated_code,
                'language': language,
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'代码生成失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SpeechToTextView(APIView):
    """语音转文字"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            audio_file = request.FILES.get('audio')
            language = request.data.get('language', 'zh')
            
            if not audio_file:
                return Response({'error': '请上传音频文件'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 调用 Whisper API
            response = openai.Audio.transcribe(
                model="whisper-1",
                file=audio_file,
                language=language
            )
            
            transcribed_text = response['text']
            
            return Response({
                'success': True,
                'text': transcribed_text,
                'language': language
            })
            
        except Exception as e:
            return Response({'error': f'语音识别失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TranslationView(APIView):
    """智能翻译"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            text = request.data.get('text', '')
            source_lang = request.data.get('source_lang', 'auto')
            target_lang = request.data.get('target_lang', 'en')
            
            if not text:
                return Response({'error': '请输入要翻译的文本'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建翻译提示
            system_prompt = f"""你是一个专业的翻译专家。请将文本从{source_lang}翻译成{target_lang}。
            要求：
            1. 保持原文的意思和语气
            2. 使用自然流畅的表达
            3. 保持专业术语的准确性
            4. 考虑文化背景差异"""
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": text}
                ],
                max_tokens=500,
                temperature=0.3
            )
            
            translated_text = response.choices[0].message.content
            
            return Response({
                'success': True,
                'original_text': text,
                'translated_text': translated_text,
                'source_lang': source_lang,
                'target_lang': target_lang
            })
            
        except Exception as e:
            return Response({'error': f'翻译失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 