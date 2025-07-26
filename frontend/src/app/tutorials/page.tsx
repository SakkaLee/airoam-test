import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlay, faClock, faUser, faStar, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/Logo";

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 1,
      title: "什么是机器学习？",
      description: "从零开始学习机器学习的基础概念，了解AI的核心原理和应用场景。",
      level: "初级",
      duration: "2小时",
      instructor: "Dr. Zhang",
      rating: 4.8,
      students: 1250,
      image: "/api/placeholder/400/250",
      category: "机器学习"
    },
    {
      id: 2,
      title: "构建你的第一个AI聊天机器人",
      description: "使用Python和自然语言处理技术，创建一个智能对话机器人。",
      level: "中级",
      duration: "4小时",
      instructor: "Prof. Li",
      rating: 4.9,
      students: 890,
      image: "/api/placeholder/400/250",
      category: "NLP"
    },
    {
      id: 3,
      title: "使用你的数据微调LLM",
      description: "学习如何针对特定领域和任务微调大型语言模型。",
      level: "高级",
      duration: "6小时",
      instructor: "Dr. Wang",
      rating: 4.7,
      students: 456,
      image: "/api/placeholder/400/250",
      category: "深度学习"
    },
    {
      id: 4,
      title: "大规模部署AI模型",
      description: "学习如何将AI模型部署到生产环境，实现高可用性和可扩展性。",
      level: "专业",
      duration: "8小时",
      instructor: "Prof. Chen",
      rating: 4.6,
      students: 234,
      image: "/api/placeholder/400/250",
      category: "工程化"
    },
    {
      id: 5,
      title: "计算机视觉基础",
      description: "掌握图像识别、目标检测等计算机视觉核心技术。",
      level: "中级",
      duration: "5小时",
      instructor: "Dr. Liu",
      rating: 4.8,
      students: 678,
      image: "/api/placeholder/400/250",
      category: "计算机视觉"
    },
    {
      id: 6,
      title: "强化学习实战",
      description: "通过实际项目学习强化学习算法和实现方法。",
      level: "高级",
      duration: "7小时",
      instructor: "Prof. Zhao",
      rating: 4.5,
      students: 345,
      image: "/api/placeholder/400/250",
      category: "强化学习"
    }
  ];

  const categories = ["全部", "机器学习", "深度学习", "NLP", "计算机视觉", "强化学习", "工程化"];
  const levels = ["全部", "初级", "中级", "高级", "专业"];

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
          <Link href="/news" className="hover:text-blue-400 transition-colors duration-200">新闻</Link>
          <Link href="/tutorials" className="text-purple-400 border-b-2 border-purple-400">教程</Link>
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
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            返回首页
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              AI教程
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            从入门到精通，系统学习人工智能技术。我们的教程由行业专家精心设计，理论与实践并重。
          </p>
        </div>

        {/* 筛选器 */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
              分类：
            </span>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === "全部"
                    ? "bg-purple-500 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-slate-300">难度：</span>
            {levels.map((level) => (
              <button
                key={level}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  level === "全部"
                    ? "bg-purple-500 text-white"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* 教程网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group overflow-hidden">
              <div className="aspect-video bg-slate-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faPlay} className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    tutorial.level === "初级" ? "bg-green-500/20 text-green-300" :
                    tutorial.level === "中级" ? "bg-yellow-500/20 text-yellow-300" :
                    tutorial.level === "高级" ? "bg-orange-500/20 text-orange-300" :
                    "bg-red-500/20 text-red-300"
                  }`}>
                    {tutorial.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                    {tutorial.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {tutorial.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                      {tutorial.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUser} className="w-3 h-3" />
                      {tutorial.instructor}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-slate-300">{tutorial.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{tutorial.students} 名学生</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-sm">
                    开始学习
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              上一页
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">1</button>
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