from django.urls import path
from .views import NewsListView, RegisterView, CreateCheckoutSessionView

urlpatterns = [
    path('news/', NewsListView.as_view()),
    path('register/', RegisterView.as_view()),
    path('create-checkout-session/', CreateCheckoutSessionView.as_view()),
] 