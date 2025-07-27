'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments,
  faLightbulb,
  faShare,
  faHeart,
  faBookmark,
  faUser,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../components/AIHeader';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: '如何利用AI提升工作效率？',
      content: '分享一些实用的AI工具和技巧，帮助大家提高工作效率...',
      author: 'AI探索者',
      avatar: '/api/placeholder/40/40',
      likes: 128,
      comments: 45,
      views: 1200,
      time: '2小时前',
      tags: ['效率提升', 'AI工具', '工作技巧'],
      hot: true
    },
    {
      id: 2,
      title: 'ChatGPT vs Claude：哪个更适合编程？',
      content: '对比两个主流AI助手的编程能力，分享使用体验...',
      author: '代码大师',
      avatar: '/api/placeholder/40/40',
      likes: 89,
      comments: 32,
      views: 890,
      time: '5小时前',
      tags: ['编程', 'AI助手', '对比评测'],
      hot: true
    },
    {
      id: 3,
      title: 'AI绘画入门指南',
      content: '从零开始学习AI绘画，推荐适合新手的工具和教程...',
      author: '艺术创作者',
      avatar: '/api/placeholder/40/40',
      likes: 156,
      comments: 67,
      views: 2100,
      time: '1天前',
      tags: ['AI绘画', '入门教程', '工具推荐'],
      hot: false
    }
  ];

  const questions = [
    {
      id: 1,
      title: '如何训练自己的AI模型？',
      content: '想了解如何基于自己的数据训练AI模型，有什么好的教程推荐吗？',
      author: 'AI学习者',
      avatar: '/api/placeholder/40/40',
      likes: 45,
      comments: 12,
      views: 560,
      time: '3小时前',
      tags: ['模型训练', '机器学习', '教程'],
      solved: false
    },
    {
      id: 2,
      title: 'Midjourney和Stable Diffusion哪个更好？',
      content: '在图像生成方面，这两个工具各有什么优缺点？',
      author: '设计师小王',
      avatar: '/api/placeholder/40/40',
      likes: 78,
      comments: 23,
      views: 980,
      time: '6小时前',
      tags: ['图像生成', '工具对比', '设计'],
      solved: true
    }
  ];

  const tabs = [
    { id: 'discussions', name: '讨论区', icon: faComments },
    { id: 'questions', name: '问答区', icon: faLightbulb },
    { id: 'resources', name: '资源分享', icon: faShare }
  ];

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
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                智能社区
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              NLP精准推荐，AI问答机器人，内容创作助手，连接全球AI爱好者
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50K+</div>
                <div className="text-gray-400">活跃用户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">100K+</div>
                <div className="text-gray-400">讨论话题</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">1M+</div>
                <div className="text-gray-400">互动次数</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-black'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={tab.icon} className="text-sm" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-white">{discussion.title}</h3>
                        {discussion.hot && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">热门</span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-4">{discussion.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.time}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faEye} className="text-xs" />
                            <span>{discussion.views}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors duration-200">
                            <FontAwesomeIcon icon={faHeart} className="text-sm" />
                            <span className="text-sm">{discussion.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200">
                            <FontAwesomeIcon icon={faComments} className="text-sm" />
                            <span className="text-sm">{discussion.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                            <FontAwesomeIcon icon={faBookmark} className="text-sm" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {discussion.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-pink-400/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faLightbulb} className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-white">{question.title}</h3>
                        {question.solved ? (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">已解决</span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">待解决</span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-4">{question.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{question.author}</span>
                          <span>•</span>
                          <span>{question.time}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faEye} className="text-xs" />
                            <span>{question.views}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors duration-200">
                            <FontAwesomeIcon icon={faHeart} className="text-sm" />
                            <span className="text-sm">{question.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200">
                            <FontAwesomeIcon icon={faComments} className="text-sm" />
                            <span className="text-sm">{question.comments}</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {question.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faShare} className="text-6xl text-gray-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-300 mb-2">资源分享区</h3>
              <p className="text-gray-400">这里将展示用户分享的AI相关资源、教程和工具</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunityPage; 