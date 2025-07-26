'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock, faTag, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../components/Logo";

interface NewsItem {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  source: string;
  time: string;
  url: string;
  image: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API base URL - use environment variable or fallback to localhost for development
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/news/${params.id}/`);
        if (response.ok) {
          const data = await response.json();
          setNews(data);
        } else {
          setError('News article not found');
        }
      } catch (error) {
        setError('Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNewsDetail();
    }
  }, [params.id, API_BASE]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 font-sans">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded mb-4"></div>
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded mb-8"></div>
            <div className="h-6 bg-slate-700 rounded mb-4"></div>
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 font-sans">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
            <p className="text-slate-300 mb-8">{error || 'News article not found'}</p>
            <Link href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 font-sans">
      {/* Header Navigation */}
      <header className="w-full flex items-center justify-between px-6 lg:px-8 py-4 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-xl lg:text-2xl font-bold tracking-wide text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Airoam</span>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-base font-medium">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <Link href="/news" className="text-blue-400 border-b-2 border-blue-400">News</Link>
          <Link href="/tutorials" className="hover:text-purple-400 transition-colors duration-200">Tutorials</Link>
          <Link href="/community" className="hover:text-green-400 transition-colors duration-200">Community</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to News
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              news.category === "Breaking" ? "bg-red-500/20 text-red-300" :
              news.category === "Research" ? "bg-purple-500/20 text-purple-300" :
              news.category === "Industry" ? "bg-green-500/20 text-green-300" :
              news.category === "Creative AI" ? "bg-pink-500/20 text-pink-300" :
              "bg-orange-500/20 text-orange-300"
            }`}>
              {news.category}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
              {news.time}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
              {news.source}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            {news.title}
          </h1>

          <p className="text-lg text-slate-300 mb-6 leading-relaxed">
            {news.excerpt}
          </p>

          {/* Original Source Link */}
          {news.url && news.url !== "#" && (
            <div className="mb-8 p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Original Source:</span>
                <a 
                  href={news.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                  View Original Article
                </a>
              </div>
            </div>
          )}
        </article>

        {/* Article Body */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed text-lg space-y-6">
              {news.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-3">More AI Research</h3>
              <p className="text-slate-300 text-sm mb-4">Explore the latest developments in artificial intelligence research and development.</p>
              <Link href="/news" className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                Browse All News →
              </Link>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-3">AI Tutorials</h3>
              <p className="text-slate-300 text-sm mb-4">Learn about AI technologies and how to implement them in your projects.</p>
              <Link href="/tutorials" className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors">
                Explore Tutorials →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm py-8 px-4 mt-16">
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
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 