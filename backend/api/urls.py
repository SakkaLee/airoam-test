from django.urls import path
from . import views
from . import upload_views
from . import ai_tools
from . import community

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/<int:pk>/', views.NewsDetailView.as_view(), name='news-detail'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    path('upload/', upload_views.FileUploadView.as_view(), name='file-upload'),
    path('files/', upload_views.FileListView.as_view(), name='file-list'),
    # AI 工具 API
    path('ai/text-generator/', ai_tools.TextGeneratorView.as_view(), name='text-generator'),
    path('ai/image-generator/', ai_tools.ImageGeneratorView.as_view(), name='image-generator'),
    path('ai/code-assistant/', ai_tools.CodeAssistantView.as_view(), name='code-assistant'),
    path('ai/speech-to-text/', ai_tools.SpeechToTextView.as_view(), name='speech-to-text'),
    path('ai/translation/', ai_tools.TranslationView.as_view(), name='translation'),
    # 社区功能 API
    path('community/ai-assistant/', community.AIAssistantView.as_view(), name='ai-assistant'),
    path('community/recommendations/', community.ContentRecommendationView.as_view(), name='recommendations'),
    path('community/discussions/', community.CommunityDiscussionView.as_view(), name='discussions'),
    path('community/content-creation/', community.ContentCreationView.as_view(), name='content-creation'),
] 