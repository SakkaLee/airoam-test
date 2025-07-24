import Image from "next/image";
import Logo from "../components/Logo";
import ContactForm from "../components/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 text-gray-100 font-sans">
      {/* 顶部导航栏 */}
      <header className="w-full flex items-center justify-between px-8 py-6 border-b border-gray-800 bg-gray-950/90 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <span className="text-2xl font-bold tracking-wide text-white">Airoam</span>
        </div>
        <nav className="flex gap-8 text-lg font-medium">
          <a href="#news" className="hover:text-blue-400 transition">AI News</a>
          <a href="#tutorials" className="hover:text-blue-400 transition">Tutorials</a>
          <a href="#community" className="hover:text-blue-400 transition">Community</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </nav>
      </header>
      {/* 主内容区 */}
      <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* AI News - 左侧两列 */}
        <section id="news" className="md:col-span-2 flex flex-col gap-8">
          <h1 className="text-4xl font-extrabold text-white mb-4 border-l-4 border-blue-500 pl-4">Latest AI News</h1>
          <article className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-300 mb-1">AI beats human at Go again! <span className="text-xs text-gray-400">(X)</span></h2>
              <p className="text-base text-gray-200">A new AI system has once again defeated the world champion in Go, demonstrating the rapid progress of artificial intelligence in complex strategy games.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-300 mb-1">New GPT-5 research paper released <span className="text-xs text-gray-400">(arXiv)</span></h2>
              <p className="text-base text-gray-200">OpenAI has published the first research paper on GPT-5, revealing breakthroughs in language understanding and reasoning capabilities.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-300 mb-1">AI-powered robots enter mass production <span className="text-xs text-gray-400">(Medium)</span></h2>
              <p className="text-base text-gray-200">Leading manufacturers are rolling out AI-powered robots for logistics, healthcare, and manufacturing, accelerating the adoption of automation worldwide.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-300 mb-1">Breakthrough in AI image generation <span className="text-xs text-gray-400">(X)</span></h2>
              <p className="text-base text-gray-200">A new generative model can create photorealistic images from text prompts, pushing the boundaries of creative AI applications.</p>
            </div>
            <a href="#" className="mt-2 text-blue-400 hover:underline font-semibold">See all news →</a>
          </article>
        </section>
        {/* Tutorials - 右侧一列 */}
        <aside id="tutorials" className="md:col-span-1 flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-pink-500 pl-4">AI Tutorials</h1>
          <ul className="flex flex-col gap-4">
            <li>
              <span className="text-lg font-semibold text-pink-300">Beginner:</span>
              <span className="ml-2 text-gray-200">What is Machine Learning?</span>
            </li>
            <li>
              <span className="text-lg font-semibold text-pink-300">Intermediate:</span>
              <span className="ml-2 text-gray-200">Build your first AI chatbot</span>
            </li>
            <li>
              <span className="text-lg font-semibold text-pink-300">Advanced:</span>
              <span className="ml-2 text-gray-200">Fine-tune LLMs with your data</span>
            </li>
            <li>
              <span className="text-lg font-semibold text-pink-300">Pro:</span>
              <span className="ml-2 text-gray-200">Deploy AI models at scale</span>
            </li>
          </ul>
          <a href="#" className="mt-2 text-pink-400 hover:underline font-semibold">Explore tutorials →</a>
        </aside>
      </main>
      {/* 底部区域 */}
      <footer className="w-full border-t border-gray-800 bg-gray-950/90 py-8 px-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Logo size={24} />
          <span className="font-bold text-lg text-white">Airoam</span>
          <span className="text-gray-400">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-gray-300">Contact: <a href="mailto:Airoam@gmail.com" className="underline hover:text-blue-400">Airoam@gmail.com</a></div>
      </footer>
    </div>
  );
}
