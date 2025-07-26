from django.urls import path
from .views import NewsListView, NewsDetailView, RegisterView, LoginView, CreateCheckoutSessionView, UserStatsView

urlpatterns = [
    path('news/', NewsListView.as_view()),
    path('news/<int:news_id>/', NewsDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('stats/', UserStatsView.as_view()),
    path('create-checkout-session/', CreateCheckoutSessionView.as_view()),
] 