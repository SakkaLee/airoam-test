'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import ContactForm from "../components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faUsers, faArrowRight, faClock, faRocket, faBrain, faGlobe, faChartLine } from "@fortawesome/free-solid-svg-icons";

interface NewsItem {
  title: string;
  excerpt: string;
  category: string;
  source: string;
  time: string;
  url: string;
  image: string;
  content?: string;
}

interface UserStats {
  total_users: number;
  recent_users: number;
  community_stats: {
    discord_members: { count: number; status: string };
    reddit_members: { count: number; status: string };
    twitter_followers: { count: number; status: string };
  };
}

export default function Home() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  // API base URL - use environment variable or fallback to localhost for development
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

  useEffect(() => {
    // Fetch real news data
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/news/`);
        if (response.ok) {
          const data = await response.json();
          setNewsData(data.news || []);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    // Fetch user statistics
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/stats/`);
        if (response.ok) {
          const data = await response.json();
          setUserStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    fetchStats();
  }, [API_BASE]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 font-sans">
      {/* Header Navigation */}
      <header className="w-full flex items-center justify-between px-6 lg:px-8 py-4 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-xl lg:text-2xl font-bold tracking-wide text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Airoam</span>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-base font-medium">
          <a href="#news" className="hover:text-blue-400 transition-colors duration-200 relative group">
            AI News
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#tutorials" className="hover:text-purple-400 transition-colors duration-200 relative group">
            Tutorials
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#community" className="hover:text-green-400 transition-colors duration-200 relative group">
            Community
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-orange-400 transition-colors duration-200 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Login</a>
          <a href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
            Sign Up
          </a>
        </div>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Company Introduction Animation Area */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-pink-500/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-green-500/20 rounded-full animate-spin"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Logo size={120} />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Airoam
            </span>
          </h1>
          
          <div className="text-2xl lg:text-3xl font-bold text-white mb-8 animate-fade-in">
            <span className="inline-block animate-slide-up">Leading Global</span>
            <span className="inline-block animate-slide-up delay-200">AI News Platform</span>
          </div>
          
          <p className="text-lg lg:text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500">
            Aggregating the latest AI technology trends, research breakthroughs, and industry insights worldwide. 
            We connect every corner of the AI world, making knowledge accessible without boundaries.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <FontAwesomeIcon icon={faRocket} className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Real-time Updates</h3>
              <p className="text-slate-300">24/7 continuous updates, get the latest AI developments first</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <FontAwesomeIcon icon={faBrain} className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Deep Analysis</h3>
              <p className="text-slate-300">Professional team insights with unique perspectives and trend predictions</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 group">
              <FontAwesomeIcon icon={faGlobe} className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Global Vision</h3>
              <p className="text-slate-300">Covering global AI ecosystem, connecting top research institutions</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/register" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Subscribe Now
            </a>
            <a href="#news" className="px-8 py-4 border-2 border-slate-600 text-white font-bold text-lg rounded-full hover:border-blue-400 hover:text-blue-400 transition-all duration-200">
              Explore News
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FontAwesomeIcon icon={faArrowRight} className="w-6 h-6 text-slate-400 rotate-90" />
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* News Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI News - Left Two Columns */}
          <section id="news" className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 text-blue-400" />
              Latest AI News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                // Loading state
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 animate-pulse">
                    <div className="h-4 bg-slate-700 rounded mb-3"></div>
                    <div className="h-6 bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                  </div>
                ))
              ) : (
                // Real news data - Show 50 items
                newsData.slice(0, 50).map((news, index) => (
                  <article key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        news.category === "Breaking" ? "bg-red-500/20 text-red-300" :
                        news.category === "Research" ? "bg-purple-500/20 text-purple-300" :
                        news.category === "Industry" ? "bg-green-500/20 text-green-300" :
                        news.category === "Creative AI" ? "bg-pink-500/20 text-pink-300" :
                        "bg-orange-500/20 text-orange-300"
                      }`}>
                        {news.category}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                        {news.time}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Source: {news.source}</span>
                                      <Link href={`/news/${index}`} className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                  Read Full Article →
                </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                View All News
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Subscription Area */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faRocket} className="w-6 h-6 text-orange-400" />
                Premium Subscription
              </h3>
              <p className="text-slate-300 text-sm mb-4">Get exclusive AI news and premium content</p>
              <div className="mb-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                <div className="text-2xl font-bold text-white">$9.99</div>
                <div className="text-slate-300 text-sm">per month</div>
              </div>
              <button 
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                onClick={() => window.location.href = '/subscribe'}
              >
                Subscribe Now
              </button>
            </div>

            {/* AI Tutorials */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-purple-400" />
                AI Tutorials
              </h3>
              <div className="space-y-3">
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded">Beginner</span>
                    <span className="text-slate-200 group-hover:text-white transition-colors text-sm">What is Machine Learning?</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded">Intermediate</span>
                    <span className="text-slate-200 group-hover:text-white transition-colors text-sm">Build Your First AI Chatbot</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded">Advanced</span>
                    <span className="text-slate-200 group-hover:text-white transition-colors text-sm">Fine-tune LLMs with Your Data</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <a href="/tutorials" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors text-sm">
                  Explore Tutorials
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Community */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-green-400" />
                Community
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-200 text-sm">Discord</span>
                  <span className="text-green-400 text-sm">
                    {userStats?.community_stats.discord_members.count || 0} members
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-200 text-sm">Reddit</span>
                  <span className="text-green-400 text-sm">
                    {userStats?.community_stats.reddit_members.count || 0} members
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-200 text-sm">Twitter</span>
                  <span className="text-green-400 text-sm">
                    {userStats?.community_stats.twitter_followers.count || 0} followers
                  </span>
                </div>
                {userStats && (
                  <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg">
                    <span className="text-slate-200 text-sm">Registered Users</span>
                    <span className="text-blue-400 text-sm">{userStats.total_users} users</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact">
              <ContactForm />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="w-full border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <div>
              <span className="font-bold text-lg text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Airoam</span>
              <div className="text-slate-400 text-sm">© {new Date().getFullYear()} All rights reserved</div>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-2">
            <div className="text-slate-300">Contact: <a href="mailto:airoam.net@gmail.com" className="text-blue-400 hover:text-blue-300 underline transition-colors">airoam.net@gmail.com</a></div>
            <div className="flex gap-4 text-slate-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
