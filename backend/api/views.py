from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
import stripe
from django.conf import settings

class NewsListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({
            "news": [
                {"title": "AI beats human at Go again!", "source": "X", "url": "https://x.com/ai-news"},
                {"title": "New GPT-5 research paper released", "source": "arXiv", "url": "https://arxiv.org/abs/1234.5678"},
            ]
        })

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=email).exists():
            return Response({'error': 'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(password)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=email, email=email, password=password)
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {'id': user.id, 'email': user.email},
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)

class CreateCheckoutSessionView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {"name": "Airoam Membership"},
                        "unit_amount": 9900,  # $99.00
                    },
                    "quantity": 1,
                }],
                mode="payment",
                success_url=request.data.get("success_url", "https://airoam.net/profile?success=1"),
                cancel_url=request.data.get("cancel_url", "https://airoam.net/profile?canceled=1"),
            )
            return Response({"checkout_url": session.url})
        except Exception as e:
            return Response({"error": str(e)}, status=400) 