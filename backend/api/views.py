from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class NewsListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({
            "news": [
                {"title": "AI beats human at Go again!", "source": "X", "url": "https://x.com/ai-news"},
                {"title": "New GPT-5 research paper released", "source": "arXiv", "url": "https://arxiv.org/abs/1234.5678"},
            ]
        }) 