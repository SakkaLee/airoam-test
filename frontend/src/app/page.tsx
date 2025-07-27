'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain, 
  faRocket, 
  faStore, 
  faUsers, 
  faGraduationCap,
  faChartLine,
  faLightbulb,
  faCog,
  faPlay,
  faArrowRight,
  faStar,
  faFire,
  faCrown,
  faShieldAlt,
  faGlobe,
  faMicrochip
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../components/AIHeader';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: faStore,
      title: 'AI工具商城',
      description: '集成全球顶尖AI工具，按需组合，按次计费',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: faUsers,
      title: '智能社区',
      description: 'NLP精准推荐，AI问答机器人，内容创作助手',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: faRocket,
      title: '企业方案',
      description: '定制化AI解决方案，从诊断到实施全流程服务',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: faGraduationCap,
      title: 'AI学院',
      description: 'VR虚拟实验室，AI评估系统，人才孵化基地',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const aiTools = [
    {
      name: '智能文案生成器',
      description: '基于GPT-4的智能文案创作工具',
      price: '¥2/次',
      rating: 4.9,
      users: '50K+',
      category: '文字生成',
      hot: true
    },
    {
      name: 'AI图像创作',
      description: 'DALL-E 3驱动的图像生成平台',
      price: '¥5/次',
      rating: 4.8,
      users: '30K+',
      category: '图像创作',
      hot: true
    },
    {
      name: '智能数据分析',
      description: '自动数据清洗、分析和可视化',
      price: '¥10/次',
      rating: 4.7,
      users: '20K+',
      category: '数据分析',
      hot: false
    },
    {
      name: '代码助手',
      description: 'AI驱动的代码生成和优化工具',
      price: '¥3/次',
      rating: 4.9,
      users: '40K+',
      category: '编程开发',
      hot: true
    }
  ];

  const stats = [
    { number: '5000万+', label: '注册用户' },
    { number: '50亿元', label: '年度营收' },
    { number: '1000+', label: 'AI工具' },
    { number: '99.9%', label: '系统可用性' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <AIHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300ffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                让AI技术普惠化 - 2025新版本
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              链接全球科技资源，打造集AI工具应用、科技内容生态、产业资源对接于一体的综合性科技AI服务平台
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-lg text-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                立即体验
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                观看演示
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              核心功能模块
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              四大核心模块，全方位满足个人、企业、科研机构的不同需求
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:border-cyan-400/50 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={feature.icon} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              热门AI工具
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              精选全球顶尖AI工具，助力您的工作和生活
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
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
                  <p className="text-gray-400 text-sm mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                      <span className="text-sm text-gray-300">{tool.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">{tool.users} 用户</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-cyan-400">{tool.price}</span>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg text-sm hover:from-cyan-500 hover:to-green-500 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      立即使用
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/tools"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              <span>查看全部工具</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              加入AI科技革命
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              成为全球5000万用户中的一员，体验最前沿的AI技术，开启智能化未来
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-lg text-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                免费注册
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                了解更多
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
