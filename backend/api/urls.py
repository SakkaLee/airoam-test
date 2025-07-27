from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/<int:pk>/', views.NewsDetailView.as_view(), name='news-detail'),
    path('upload/', views.FileUploadView.as_view(), name='file-upload'),
    path('files/', views.FileListView.as_view(), name='file-list'),
] 