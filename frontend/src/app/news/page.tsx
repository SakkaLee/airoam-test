import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock, faTag, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/Logo";
import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  source: string;
  time: string;
  url?: string;
  image?: string;
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API base URL
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

  // 获取新闻数据
  const fetchNews = async (searchValue = "") => {
    setLoading(true);
    setError("");
    try {
      const url = searchValue
        ? `${API_BASE}/api/news/?search=${encodeURIComponent(searchValue)}`
        : `${API_BASE}/api/news/`;
      console.log("[News Debug] Fetching:", url); // 调试输出
      const res = await fetch(url);
      if (!res.ok) throw new Error("获取新闻失败");
      const data = await res.json();
      console.log("[News Debug] Response:", data); // 调试输出
      setNewsData(data.news || []);
    } catch (e) {
      setError("新闻获取失败，请稍后重试");
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 搜索栏输入时自动搜索
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchNews(search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const categories = ["All", "Breaking", "Research", "Industry", "Creative AI", "Policy"];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 font-sans">
      {/* 顶部导航栏 */}
      <header className="w-full flex items-center justify-between px-6 lg:px-8 py-4 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-xl lg:text-2xl font-bold tracking-wide text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Airoam</span>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-base font-medium">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200">首页</Link>
          <Link href="/news" className="text-blue-400 border-b-2 border-blue-400">新闻</Link>
          <Link href="/tutorials" className="hover:text-purple-400 transition-colors duration-200">教程</Link>
          <Link href="/community" className="hover:text-green-400 transition-colors duration-200">社区</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">登录</a>
          <a href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
            注册
          </a>
        </div>
      </header>

      {/* 页面头部 */}
      {newsData.length > 0 && newsData.every(item => !item.title) && (
        <div className="bg-red-600 text-white p-4 mb-4 rounded-lg text-center font-bold">
          [调试警告] newsData 有内容但 title 字段为空，可能是渲染逻辑或数据结构问题。
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI新闻
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            获取最新的人工智能技术动态、研究成果和行业洞察，保持对AI领域发展的敏锐感知。
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索新闻..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 text-white border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-slate-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
              筛选
            </button>
          </div>
        </div>

        {/* 分类标签 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === "All"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 新闻网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center text-slate-400 py-8">加载中...</div>
          ) : error ? (
            <div className="col-span-3 text-center text-red-400 py-8">{error}</div>
          ) : newsData.length === 0 ? (
            <div className="col-span-3 text-center text-slate-400 py-8">暂无新闻</div>
          ) : (
            newsData.map((news, idx) => (
              <article key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group overflow-hidden">
                <div className="aspect-video bg-slate-700/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      news.category === "Breaking" ? "bg-red-500/20 text-red-300" :
                      news.category === "Research" ? "bg-purple-500/20 text-purple-300" :
                      news.category === "Industry" ? "bg-green-500/20 text-green-300" :
                      news.category === "Creative AI" ? "bg-pink-500/20 text-pink-300" :
                      "bg-orange-500/20 text-orange-300"
                    }`}>
                      {news.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                    <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                    {news.time}
                    <span className="mx-2">•</span>
                    <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                    {news.source}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  
                  <a href={news.url || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                    阅读更多 →
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

        {/* 分页 */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              上一页
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors">2</button>
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors">3</button>
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              下一页
            </button>
          </div>
        </div>
      </div>

      {/* 底部区域 */}
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
              <a href="/privacy" className="hover:text-white transition-colors">隐私政策</a>
              <a href="/terms" className="hover:text-white transition-colors">服务条款</a>
              <a href="/about" className="hover:text-white transition-colors">关于我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 