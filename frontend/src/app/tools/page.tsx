'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStore, 
  faSearch, 
  faStar,
  faFire,
  faUsers,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../components/AIHeader';

const ToolsPage: React.FC = () => {
  const tools = [
    {
      id: 1,
      name: '智能文案生成器',
      description: '基于GPT-4的智能文案创作工具，支持多种文案类型',
      price: '¥2/次',
      rating: 4.9,
      users: '50K+',
      category: '文字生成',
      hot: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'AI图像创作',
      description: 'DALL-E 3驱动的图像生成平台，高质量AI绘画',
      price: '¥5/次',
      rating: 4.8,
      users: '30K+',
      category: '图像创作',
      hot: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: '智能数据分析',
      description: '自动数据清洗、分析和可视化，支持多种数据格式',
      price: '¥10/次',
      rating: 4.7,
      users: '20K+',
      category: '数据分析',
      hot: false,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: '代码助手',
      description: 'AI驱动的代码生成和优化工具，支持多种编程语言',
      price: '¥3/次',
      rating: 4.9,
      users: '40K+',
      category: '编程开发',
      hot: true,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: '语音转文字',
      description: '高精度语音识别，支持多种语言和方言',
      price: '¥1/分钟',
      rating: 4.6,
      users: '25K+',
      category: '语音处理',
      hot: false,
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: '智能翻译',
      description: '多语言实时翻译，支持文档和网页翻译',
      price: '¥0.5/千字',
      rating: 4.8,
      users: '35K+',
      category: '语言处理',
      hot: true,
      image: '/api/placeholder/300/200'
    }
  ];

  const categories = ['全部', '文字生成', '图像创作', '数据分析', '编程开发', '语音处理', '语言处理'];

  return (
    <div className="min-h-screen bg-black text-white">
      <AIHeader />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                AI工具商城
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              精选全球顶尖AI工具，按需组合，按次计费，让AI技术触手可及
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索AI工具..."
                  className="w-full px-6 py-4 pl-12 pr-16 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200">
                  搜索
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    category === '全部' 
                      ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-black' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Tool Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <FontAwesomeIcon icon={faStore} className="text-4xl text-gray-500" />
                  </div>
                  
                  {/* Tool Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                        {tool.category}
                      </span>
                      {tool.hot && (
                        <FontAwesomeIcon icon={faFire} className="text-orange-400 text-sm" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-300">{tool.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faUsers} className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-400">{tool.users}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-400">{tool.price}</span>
                      <motion.button
                        className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg text-sm hover:from-cyan-500 hover:to-green-500 transition-all duration-200 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>立即使用</span>
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage; 