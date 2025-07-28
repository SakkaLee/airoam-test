from django.urls import path
from . import views
from . import upload_views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/<int:pk>/', views.NewsDetailView.as_view(), name='news-detail'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    path('upload/', upload_views.FileUploadView.as_view(), name='file-upload'),
    path('files/', upload_views.FileListView.as_view(), name='file-list'),
] 