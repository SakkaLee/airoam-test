from django.urls import path
from .views import NewsListView, NewsDetailView, RegisterView, LoginView, CreateCheckoutSessionView, UserStatsView
from .upload_views import (
    FileUploadView, FileListView, FileDetailView, FileDownloadView,
    CreateShareView, ShareDownloadView, PublicFilesView
)

urlpatterns = [
    path('news/', NewsListView.as_view()),
    path('news/<int:news_id>/', NewsDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('stats/', UserStatsView.as_view()),
    path('create-checkout-session/', CreateCheckoutSessionView.as_view()),
    
    # 文件上传相关API
    path('upload/', FileUploadView.as_view()),
    path('files/', FileListView.as_view()),
    path('files/<int:file_id>/', FileDetailView.as_view()),
    path('files/<int:file_id>/download/', FileDownloadView.as_view()),
    path('files/<int:file_id>/share/', CreateShareView.as_view()),
    path('share/<str:share_token>/', ShareDownloadView.as_view()),
    path('public-files/', PublicFilesView.as_view()),
] 