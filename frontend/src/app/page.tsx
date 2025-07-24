import Image from "next/image";
import Logo from "../components/Logo";
import ContactForm from "../components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="relative font-sans min-h-screen flex flex-col justify-between overflow-hidden" style={{background: "linear-gradient(135deg, #0ea5e9 0%, #a78bfa 40%, #f472b6 80%, #fbbf24 100%)"}}>
      {/* 多色动态光斑背景 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl left-[-10%] top-[-10%] animate-pulse" />
        <div className="absolute w-72 h-72 bg-pink-400/20 rounded-full blur-2xl right-[-8%] top-[30%] animate-pulse-slow" />
        <div className="absolute w-64 h-64 bg-yellow-300/20 rounded-full blur-2xl left-[40%] bottom-[-10%] animate-pulse" />
        <div className="absolute w-60 h-60 bg-purple-400/20 rounded-full blur-2xl right-[20%] bottom-[10%] animate-pulse-slow" />
      </div>
      {/* Navbar with Logo placeholder */}
      <header className="relative z-10 w-full flex items-center justify-between px-6 py-4 shadow-lg bg-blue-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-2xl font-bold tracking-wide text-blue-100 drop-shadow">Airoam</span>
        </div>
        <nav className="flex gap-6 text-lg">
          <a href="#features" className="hover:text-cyan-300 transition flex items-center gap-1"><FontAwesomeIcon icon={faRobot} /> Features</a>
          <a href="#contact" className="hover:text-pink-300 transition flex items-center gap-1"><FontAwesomeIcon icon={faUsers} /> Contact</a>
        </nav>
      </header>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10 px-4">
        {/* 品牌与简介 */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <Logo size={64} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center text-blue-100 drop-shadow-lg">Airoam - AI News Aggregator</h1>
          <p className="text-lg sm:text-xl text-cyan-100 text-center max-w-2xl drop-shadow">Your gateway to the latest global AI news, research, tutorials, and expert insights. Stay ahead in the world of artificial intelligence.</p>
        </div>
        {/* AI 资讯动态区块 */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col gap-3 border-l-8 border-cyan-400">
            <h2 className="text-2xl font-bold text-cyan-700 mb-2 flex items-center gap-2"><FontAwesomeIcon icon={faRobot} /> Latest AI News</h2>
            <ul className="text-gray-800 text-base list-disc list-inside space-y-1">
              <li><span className="font-semibold">AI beats human at Go again!</span> <span className="text-xs text-gray-500">(X)</span></li>
              <li><span className="font-semibold">New GPT-5 research paper released</span> <span className="text-xs text-gray-500">(arXiv)</span></li>
              <li><span className="font-semibold">AI-powered robots enter mass production</span> <span className="text-xs text-gray-500">(Medium)</span></li>
              <li><span className="font-semibold">Breakthrough in AI image generation</span> <span className="text-xs text-gray-500">(X)</span></li>
            </ul>
            <a href="#" className="mt-2 text-cyan-700 hover:underline">See all news →</a>
          </div>
          {/* 教程区块 */}
          <div className="bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col gap-3 border-l-8 border-pink-400">
            <h2 className="text-2xl font-bold text-pink-700 mb-2 flex items-center gap-2"><FontAwesomeIcon icon={faBookOpen} /> AI Tutorials</h2>
            <ul className="text-gray-800 text-base list-disc list-inside space-y-1">
              <li><span className="font-semibold">Beginner: What is Machine Learning?</span></li>
              <li><span className="font-semibold">Intermediate: Build your first AI chatbot</span></li>
              <li><span className="font-semibold">Advanced: Fine-tune LLMs with your data</span></li>
              <li><span className="font-semibold">Pro: Deploy AI models at scale</span></li>
            </ul>
            <a href="#" className="mt-2 text-pink-700 hover:underline">Explore tutorials →</a>
          </div>
        </section>
        {/* 平台优势与社区介绍 */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 rounded-2xl shadow-xl p-8 flex flex-col gap-3 border-l-8 border-yellow-400">
            <h2 className="text-2xl font-bold text-yellow-700 mb-2">Why Choose Airoam?</h2>
            <ul className="text-gray-700 text-base list-disc list-inside space-y-1">
              <li>Real-time global AI news aggregation</li>
              <li>Expert-curated tutorials for all levels</li>
              <li>Active community for discussion and sharing</li>
              <li>Personalized recommendations and notifications</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 flex flex-col gap-3 border-l-8 border-purple-400">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Airoam Community</h2>
            <ul className="text-gray-700 text-base list-disc list-inside space-y-1">
              <li>Share your opinions and comment on news</li>
              <li>Connect with AI enthusiasts worldwide</li>
              <li>Participate in events and webinars</li>
              <li>Get support and feedback from experts</li>
            </ul>
          </div>
        </section>
        {/* 用户评价区块 */}
        <section className="w-full max-w-5xl mt-8">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-cyan-400">
              <span className="font-semibold text-cyan-700">“Airoam keeps me updated with the latest AI breakthroughs every day!”</span>
              <span className="text-sm text-gray-500">— Alex, Data Scientist</span>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-pink-400">
              <span className="font-semibold text-pink-700">“The tutorials are clear and practical, perfect for beginners and pros.”</span>
              <span className="text-sm text-gray-500">— Jamie, AI Enthusiast</span>
            </div>
            <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-yellow-400">
              <span className="font-semibold text-yellow-700">“I love the community and the personalized recommendations!”</span>
              <span className="text-sm text-gray-500">— Morgan, ML Engineer</span>
            </div>
          </div>
        </section>
        <a href="#contact" className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-white font-semibold text-xl shadow-xl transition-all duration-300 drop-shadow-lg">Get Started</a>
      </main>
      {/* Footer with Contact */}
      <footer className="relative z-10 w-full py-8 px-4 flex flex-col items-center gap-2 bg-blue-950/90 backdrop-blur-md" id="contact">
        <div className="flex items-center gap-2 mb-2">
          <Logo size={28} />
          <span className="font-bold text-xl text-blue-100">Airoam</span>
          <span className="text-cyan-200">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-cyan-100">Contact: <a href="mailto:Airoam@gmail.com" className="underline hover:text-cyan-300">Airoam@gmail.com</a></div>
        <div className="mt-4 w-full flex justify-center">
          <ContactForm />
        </div>
      </footer>
    </div>
  );
}
