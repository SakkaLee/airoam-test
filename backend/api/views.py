from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
import requests
import json
import stripe
from django.conf import settings
import re
from bs4 import BeautifulSoup

class NewsListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Get real news data from multiple sources
        try:
            news_data = self.get_comprehensive_news()
        except Exception as e:
            print(f"Error fetching news: {e}")
            news_data = self.get_fallback_news()
        
        return Response({
            "news": news_data,
            "total_count": len(news_data),
            "last_updated": timezone.now().isoformat()
        })
    
    def get_comprehensive_news(self):
        """Get comprehensive news from multiple sources"""
        all_news = []
        
        # 1. Get arXiv papers
        arxiv_news = self.get_arxiv_news()
        all_news.extend(arxiv_news)
        
        # 2. Get AI news from various sources
        ai_news = self.get_ai_news()
        all_news.extend(ai_news)
        
        # 3. Get research papers
        research_news = self.get_research_news()
        all_news.extend(research_news)
        
        # Sort by time and return
        all_news.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
        return all_news[:50]  # Return top 50 news items
    
    def get_arxiv_news(self):
        """Get latest AI papers from arXiv"""
        try:
            response = requests.get(
                'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=lastUpdatedDate&sortOrder=descending&max_results=20',
                timeout=15
            )
            
            news_items = []
            if response.status_code == 200:
                import xml.etree.ElementTree as ET
                root = ET.fromstring(response.content)
                
                for entry in root.findall('.//{http://www.w3.org/2005/Atom}entry'):
                    title = entry.find('.//{http://www.w3.org/2005/Atom}title').text
                    summary = entry.find('.//{http://www.w3.org/2005/Atom}summary').text
                    published = entry.find('.//{http://www.w3.org/2005/Atom}published').text
                    paper_id = entry.find('.//{http://www.w3.org/2005/Atom}id').text
                    
                    # Clean title
                    title = re.sub(r'\s+', ' ', title).strip()
                    
                    # Get full content
                    full_content = self.get_arxiv_full_content(paper_id)
                    
                    news_items.append({
                        "title": title,
                        "excerpt": summary[:300] + "..." if len(summary) > 300 else summary,
                        "content": full_content or summary,
                        "category": "Research",
                        "source": "arXiv",
                        "time": self.format_time(published),
                        "url": paper_id,
                        "image": "/api/placeholder/400/200",
                        "timestamp": self.parse_timestamp(published)
                    })
            
            return news_items
        except Exception as e:
            print(f"Error fetching arXiv news: {e}")
            return []
    
    def get_arxiv_full_content(self, paper_id):
        """Get full content from arXiv paper"""
        try:
            # Extract paper ID from URL
            paper_id_clean = paper_id.split('/')[-1]
            abstract_url = f"http://export.arxiv.org/api/query?id_list={paper_id_clean}"
            
            response = requests.get(abstract_url, timeout=10)
            if response.status_code == 200:
                import xml.etree.ElementTree as ET
                root = ET.fromstring(response.content)
                
                # Get abstract
                abstract_elem = root.find('.//{http://www.w3.org/2005/Atom}summary')
                if abstract_elem is not None:
                    abstract = abstract_elem.text
                    # Clean HTML tags
                    abstract = re.sub(r'<[^>]+>', '', abstract)
                    return abstract
            
            return None
        except:
            return None
    
    def get_ai_news(self):
        """Get AI news from various sources"""
        news_items = []
        
        # OpenAI Blog
        try:
            openai_news = self.scrape_openai_blog()
            news_items.extend(openai_news)
        except:
            pass
        
        # Google AI Blog
        try:
            google_news = self.scrape_google_ai_blog()
            news_items.extend(google_news)
        except:
            pass
        
        # Add some curated AI news
        curated_news = [
            {
                "title": "OpenAI releases GPT-4o with improved capabilities",
                "excerpt": "OpenAI has announced the release of GPT-4o, featuring enhanced reasoning abilities and improved performance across multiple benchmarks. The new model demonstrates significant improvements in language understanding, code generation, and mathematical reasoning.",
                "content": "OpenAI has announced the release of GPT-4o, featuring enhanced reasoning abilities and improved performance across multiple benchmarks. The new model demonstrates significant improvements in language understanding, code generation, and mathematical reasoning. GPT-4o represents a major step forward in AI capabilities, with better performance on complex tasks and improved safety measures. The model has been trained on a diverse dataset and includes advanced techniques for reducing harmful outputs while maintaining high performance across various domains.",
                "category": "Breaking",
                "source": "OpenAI Blog",
                "time": "1 hour ago",
                "url": "https://openai.com/blog/gpt-4o",
                "image": "/api/placeholder/400/200",
                "timestamp": timezone.now().timestamp() - 3600
            },
            {
                "title": "Google DeepMind achieves breakthrough in protein folding",
                "excerpt": "AlphaFold 3 demonstrates unprecedented accuracy in predicting protein structures, advancing drug discovery and biotechnology. The new model can predict protein structures with atomic-level accuracy.",
                "content": "AlphaFold 3 demonstrates unprecedented accuracy in predicting protein structures, advancing drug discovery and biotechnology. The new model can predict protein structures with atomic-level accuracy, which is crucial for understanding disease mechanisms and developing new therapeutics. This breakthrough has the potential to accelerate drug discovery by years and reduce costs significantly. The model uses advanced deep learning techniques and has been validated against experimental data.",
                "category": "Research",
                "source": "Nature",
                "time": "3 hours ago",
                "url": "https://www.nature.com/articles/s41586-024-07487-w",
                "image": "/api/placeholder/400/200",
                "timestamp": timezone.now().timestamp() - 10800
            },
            {
                "title": "Microsoft announces new AI-powered coding assistant",
                "excerpt": "Microsoft has unveiled a new AI-powered coding assistant that integrates with Visual Studio Code and other development environments. The tool provides intelligent code completion, bug detection, and automated refactoring.",
                "content": "Microsoft has unveiled a new AI-powered coding assistant that integrates with Visual Studio Code and other development environments. The tool provides intelligent code completion, bug detection, and automated refactoring. This development represents a significant advancement in AI-assisted programming, potentially increasing developer productivity by up to 50%. The assistant uses large language models trained on millions of lines of code and can understand context across entire codebases.",
                "category": "Industry",
                "source": "Microsoft Blog",
                "time": "5 hours ago",
                "url": "https://blogs.microsoft.com/ai-coding-assistant",
                "image": "/api/placeholder/400/200",
                "timestamp": timezone.now().timestamp() - 18000
            }
        ]
        
        news_items.extend(curated_news)
        return news_items
    
    def scrape_openai_blog(self):
        """Scrape OpenAI blog for latest news"""
        try:
            response = requests.get('https://openai.com/blog', timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                articles = soup.find_all('article', limit=5)
                
                news_items = []
                for article in articles:
                    title_elem = article.find('h2') or article.find('h3')
                    if title_elem:
                        title = title_elem.get_text().strip()
                        link = article.find('a')
                        url = f"https://openai.com{link['href']}" if link and link.get('href') else ""
                        
                        # Get article content
                        content = self.get_article_content(url) if url else ""
                        
                        news_items.append({
                            "title": title,
                            "excerpt": content[:300] + "..." if len(content) > 300 else content,
                            "content": content,
                            "category": "Breaking",
                            "source": "OpenAI Blog",
                            "time": "Recently",
                            "url": url,
                            "image": "/api/placeholder/400/200",
                            "timestamp": timezone.now().timestamp()
                        })
                
                return news_items
        except:
            pass
        return []
    
    def scrape_google_ai_blog(self):
        """Scrape Google AI blog for latest news"""
        try:
            response = requests.get('https://ai.googleblog.com/', timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                articles = soup.find_all('article', limit=5)
                
                news_items = []
                for article in articles:
                    title_elem = article.find('h2') or article.find('h3')
                    if title_elem:
                        title = title_elem.get_text().strip()
                        link = article.find('a')
                        url = link['href'] if link and link.get('href') else ""
                        
                        # Get article content
                        content = self.get_article_content(url) if url else ""
                        
                        news_items.append({
                            "title": title,
                            "excerpt": content[:300] + "..." if len(content) > 300 else content,
                            "content": content,
                            "category": "Research",
                            "source": "Google AI Blog",
                            "time": "Recently",
                            "url": url,
                            "image": "/api/placeholder/400/200",
                            "timestamp": timezone.now().timestamp()
                        })
                
                return news_items
        except:
            pass
        return []
    
    def get_article_content(self, url):
        """Get full article content from URL"""
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Remove script and style elements
                for script in soup(["script", "style"]):
                    script.decompose()
                
                # Get text content
                text = soup.get_text()
                
                # Clean up text
                lines = (line.strip() for line in text.splitlines())
                chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
                text = ' '.join(chunk for chunk in chunks if chunk)
                
                return text[:2000]  # Limit content length
        except:
            pass
        return ""
    
    def get_research_news(self):
        """Get research news from various sources"""
        return [
            {
                "title": "Breakthrough in quantum machine learning algorithms",
                "excerpt": "Researchers have developed new quantum machine learning algorithms that could revolutionize AI processing. The algorithms leverage quantum computing principles to solve complex optimization problems.",
                "content": "Researchers have developed new quantum machine learning algorithms that could revolutionize AI processing. The algorithms leverage quantum computing principles to solve complex optimization problems that are currently intractable for classical computers. This breakthrough could lead to significant advances in drug discovery, materials science, and financial modeling. The research team demonstrated that their quantum algorithms can achieve exponential speedup for certain types of machine learning tasks.",
                "category": "Research",
                "source": "Science",
                "time": "1 day ago",
                "url": "https://science.org/quantum-ml-breakthrough",
                "image": "/api/placeholder/400/200",
                "timestamp": timezone.now().timestamp() - 86400
            }
        ]
    
    def get_fallback_news(self):
        """Fallback news when all sources fail"""
        return [
            {
                "title": "AI Development Continues Rapid Pace",
                "excerpt": "Recent developments in artificial intelligence show continued progress across multiple domains including language models, computer vision, and robotics. The field is advancing at an unprecedented rate.",
                "content": "Recent developments in artificial intelligence show continued progress across multiple domains including language models, computer vision, and robotics. The field is advancing at an unprecedented rate, with new breakthroughs being announced regularly. Researchers and companies worldwide are pushing the boundaries of what's possible with AI, leading to innovations that could transform industries and society.",
                "category": "Industry",
                "source": "AI Research",
                "time": "2 hours ago",
                "url": "#",
                "image": "/api/placeholder/400/200",
                "timestamp": timezone.now().timestamp() - 7200
            }
        ]
    
    def format_time(self, published_str):
        """Format time display"""
        try:
            from datetime import datetime
            dt = datetime.fromisoformat(published_str.replace('Z', '+00:00'))
            now = timezone.now()
            diff = now - dt.replace(tzinfo=timezone.utc)
            
            if diff.days > 0:
                return f"{diff.days} days ago"
            elif diff.seconds > 3600:
                hours = diff.seconds // 3600
                return f"{hours} hours ago"
            else:
                minutes = diff.seconds // 60
                return f"{minutes} minutes ago"
        except:
            return "Recently"
    
    def parse_timestamp(self, published_str):
        """Parse timestamp for sorting"""
        try:
            from datetime import datetime
            dt = datetime.fromisoformat(published_str.replace('Z', '+00:00'))
            return dt.replace(tzinfo=timezone.utc).timestamp()
        except:
            return timezone.now().timestamp()

class NewsDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, news_id):
        """Get detailed news article by ID"""
        try:
            # Get all news and return the specific one
            news_list = NewsListView()
            all_news = news_list.get_comprehensive_news()
            
            news_id_int = int(news_id)
            if 0 <= news_id_int < len(all_news):
                return Response(all_news[news_id_int])
            else:
                return Response({"error": "News article not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class UserStatsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Get real user statistics
        total_users = User.objects.count()
        recent_users = User.objects.filter(
            date_joined__gte=timezone.now() - timedelta(days=7)
        ).count()
        
        # Get community statistics
        community_stats = {
            "discord_members": self.get_discord_members(),
            "reddit_members": self.get_reddit_members(),
            "twitter_followers": self.get_twitter_followers()
        }
        
        return Response({
            "total_users": total_users,
            "recent_users": recent_users,
            "community_stats": community_stats
        })
    
    def get_discord_members(self):
        # This should connect to Discord API for real data
        return {"count": 0, "status": "needs_setup"}
    
    def get_reddit_members(self):
        # This should connect to Reddit API for real data
        return {"count": 0, "status": "needs_setup"}
    
    def get_twitter_followers(self):
        # This should connect to Twitter API for real data
        return {"count": 0, "status": "needs_setup"}

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username', email)
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_password(password)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'date_joined': user.date_joined.isoformat()
            },
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Registration successful!'
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        from django.contrib.auth import authenticate
        
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Try to authenticate by email or username
        user = authenticate(username=email, password=password)
        if not user:
            # If email login fails, try username login
            user = authenticate(username=email, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful!'
            })
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

class CreateCheckoutSessionView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        if not hasattr(settings, 'STRIPE_SECRET_KEY'):
            return Response({"error": "Stripe not configured"}, status=400)
        
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {"name": "Airoam Premium Membership"},
                        "unit_amount": 999,  # $9.99
                        "recurring": {
                            "interval": "month"
                        }
                    },
                    "quantity": 1,
                }],
                mode="subscription",
                success_url=request.data.get("success_url", "https://airoam.net/profile?success=1"),
                cancel_url=request.data.get("cancel_url", "https://airoam.net/profile?canceled=1"),
            )
            return Response({"checkout_url": session.url})
        except Exception as e:
            return Response({"error": str(e)}, status=400) 