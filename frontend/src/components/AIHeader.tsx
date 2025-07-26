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
  faSearch,
  faBell,
  faUser,
  faCog,
  faSignOutAlt,
  faMicrophone,
  faMicrophoneSlash
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface AIHeaderProps {
  user?: {
    id: string;
    name: string;
    avatar?: string;
    membership: 'free' | 'premium' | 'enterprise';
  };
}

const AIHeader: React.FC<AIHeaderProps> = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    // 这里集成语音识别API
  };

  const navigationItems = [
    { name: 'AI工具商城', icon: faStore, href: '/tools' },
    { name: '智能社区', icon: faUsers, href: '/community' },
    { name: '企业方案', icon: faRocket, href: '/enterprise' },
    { name: 'AI学院', icon: faGraduationCap, href: '/academy' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-cyan-500/20' 
          : 'bg-gradient-to-r from-black via-gray-900 to-black'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon 
                icon={faBrain} 
                className="text-3xl text-cyan-400"
              />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
              />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              AI科技平台
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200 group"
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className="text-sm group-hover:scale-110 transition-transform duration-200"
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索AI工具、教程、解决方案..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-12 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <motion.button
                onClick={handleVoiceCommand}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200 ${
                  isListening 
                    ? 'text-red-400 bg-red-400/10' 
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon 
                  icon={isListening ? faMicrophoneSlash : faMicrophone} 
                  className="text-sm"
                />
              </motion.button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* AI Assistant Button */}
            <motion.button
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              className="relative p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faBrain} className="text-lg" />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity 
                }}
              />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faBell} className="text-lg" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></span>
            </motion.button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 flex items-center justify-center">
                    <span className="text-sm font-semibold text-black">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg"
                    >
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faUser} className="mr-3" />
                          个人中心
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faCog} className="mr-3" />
                          设置
                        </Link>
                        <hr className="border-gray-600 my-1" />
                        <button className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                          退出登录
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isAIAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900/95 backdrop-blur-md border-t border-cyan-500/20"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="我是您的AI助手，有什么可以帮助您的吗？"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  发送
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default AIHeader; 