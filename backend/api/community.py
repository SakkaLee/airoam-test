import os
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.conf import settings
import openai
from django.utils import timezone
from datetime import timedelta

# 配置 OpenAI
openai.api_key = os.environ.get('OPENAI_API_KEY', '')

class AIAssistantView(APIView):
    """AI 智能助手"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            question = request.data.get('question', '')
            context = request.data.get('context', '')
            user_id = request.data.get('user_id', 'anonymous')
            
            if not question:
                return Response({'error': '请输入您的问题'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建系统提示
            system_prompt = """你是一个专业的AI助手，专门帮助用户解答各种问题。
            要求：
            1. 回答要准确、专业、易懂
            2. 提供实用的建议和解决方案
            3. 如果涉及技术问题，提供具体的步骤
            4. 保持友好和耐心的态度
            5. 如果不确定，诚实说明并提供可能的解决方案"""
            
            # 构建用户消息
            user_message = question
            if context:
                user_message = f"背景信息：{context}\n\n问题：{question}"
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=800,
                temperature=0.7
            )
            
            answer = response.choices[0].message.content
            
            return Response({
                'success': True,
                'answer': answer,
                'question': question,
                'timestamp': timezone.now().isoformat(),
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'AI 助手暂时无法回答，请稍后重试: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContentRecommendationView(APIView):
    """智能内容推荐"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            user_interests = request.data.get('interests', [])
            user_history = request.data.get('history', [])
            category = request.data.get('category', 'all')
            
            # 构建推荐提示
            system_prompt = f"""你是一个专业的内容推荐专家。根据用户的兴趣和历史，推荐相关的内容。
            用户兴趣：{', '.join(user_interests) if user_interests else '未指定'}
            浏览历史：{', '.join(user_history) if user_history else '无'}
            推荐类别：{category}
            
            请推荐5个相关内容，格式如下：
            1. 标题 - 简短描述
            2. 标题 - 简短描述
            ..."""
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": "请根据我的兴趣推荐相关内容"}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            recommendations = response.choices[0].message.content
            
            return Response({
                'success': True,
                'recommendations': recommendations,
                'category': category,
                'timestamp': timezone.now().isoformat()
            })
            
        except Exception as e:
            return Response({'error': f'推荐失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CommunityDiscussionView(APIView):
    """社区讨论"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            topic = request.data.get('topic', '')
            content = request.data.get('content', '')
            user_id = request.data.get('user_id', 'anonymous')
            
            if not topic or not content:
                return Response({'error': '请输入话题和内容'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 这里可以保存到数据库，现在先返回模拟数据
            discussion = {
                'id': f'disc_{int(timezone.now().timestamp())}',
                'topic': topic,
                'content': content,
                'user_id': user_id,
                'created_at': timezone.now().isoformat(),
                'likes': 0,
                'replies': []
            }
            
            return Response({
                'success': True,
                'discussion': discussion,
                'message': '讨论发布成功'
            })
            
        except Exception as e:
            return Response({'error': f'发布失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContentCreationView(APIView):
    """AI 内容创作助手"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            topic = request.data.get('topic', '')
            content_type = request.data.get('content_type', 'article')  # article, post, summary
            style = request.data.get('style', 'professional')
            length = request.data.get('length', 'medium')
            
            if not topic:
                return Response({'error': '请输入创作主题'}, status=status.HTTP_400_BAD_REQUEST)
            
            # 构建创作提示
            content_types = {
                'article': '专业文章',
                'post': '社交媒体帖子',
                'summary': '内容摘要'
            }
            
            system_prompt = f"""你是一个专业的内容创作专家。请创作一篇{content_types.get(content_type, '文章')}。
            主题：{topic}
            风格：{style}
            长度：{length}
            
            要求：
            1. 内容要有价值和吸引力
            2. 结构清晰，逻辑性强
            3. 语言流畅，易于理解
            4. 符合目标受众的阅读习惯"""
            
            # 调用 OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"请创作关于'{topic}'的{content_types.get(content_type, '文章')}"}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            
            created_content = response.choices[0].message.content
            
            return Response({
                'success': True,
                'content': created_content,
                'topic': topic,
                'content_type': content_type,
                'style': style,
                'usage': {
                    'tokens': response.usage.total_tokens,
                    'cost': response.usage.total_tokens * 0.000002
                }
            })
            
        except Exception as e:
            return Response({'error': f'创作失败: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 