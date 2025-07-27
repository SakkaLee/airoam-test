'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faPlay,
  faClock,
  faUser,
  faStar,
  faBook,
  faLaptop,
  faVrCardboard,
  faChartBar,
  faTrophy,
  faArrowRight,
  faFilter,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../components/AIHeader';

const AcademyPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'AI基础入门课程',
      description: '从零开始学习人工智能基础知识，掌握AI核心概念',
      instructor: '张教授',
      duration: '8周',
      level: '初级',
      rating: 4.8,
      students: '2.5K',
      price: '¥299',
      originalPrice: '¥599',
      category: '基础课程',
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: 2,
      title: '机器学习实战',
      description: '通过实际项目学习机器学习算法和应用',
      instructor: '李博士',
      duration: '12周',
      level: '中级',
      rating: 4.9,
      students: '1.8K',
      price: '¥499',
      originalPrice: '¥899',
      category: '机器学习',
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: 3,
      title: '深度学习与神经网络',
      description: '深入学习神经网络原理和深度学习框架',
      instructor: '王专家',
      duration: '16周',
      level: '高级',
      rating: 4.7,
      students: '1.2K',
      price: '¥799',
      originalPrice: '¥1299',
      category: '深度学习',
      image: '/api/placeholder/300/200',
      featured: false
    },
    {
      id: 4,
      title: '自然语言处理',
      description: '学习NLP技术和现代语言模型应用',
      instructor: '陈研究员',
      duration: '10周',
      level: '中级',
      rating: 4.6,
      students: '980',
      price: '¥399',
      originalPrice: '¥699',
      category: 'NLP',
      image: '/api/placeholder/300/200',
      featured: false
    },
    {
      id: 5,
      title: '计算机视觉',
      description: '掌握图像识别和计算机视觉技术',
      instructor: '刘工程师',
      duration: '14周',
      level: '中级',
      rating: 4.8,
      students: '1.5K',
      price: '¥599',
      originalPrice: '¥999',
      category: '计算机视觉',
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: 6,
      title: 'AI产品经理',
      description: '学习AI产品设计和项目管理',
      instructor: '赵总监',
      duration: '6周',
      level: '初级',
      rating: 4.5,
      students: '750',
      price: '¥199',
      originalPrice: '¥399',
      category: '产品管理',
      image: '/api/placeholder/300/200',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: '全部课程' },
    { id: 'basic', name: '基础课程' },
    { id: 'ml', name: '机器学习' },
    { id: 'dl', name: '深度学习' },
    { id: 'nlp', name: '自然语言处理' },
    { id: 'cv', name: '计算机视觉' },
    { id: 'pm', name: '产品管理' }
  ];

  const features = [
    {
      icon: faVrCardboard,
      title: 'VR虚拟实验室',
      description: '沉浸式学习体验，实践操作更直观'
    },
    {
      icon: faChartBar,
      title: 'AI评估系统',
      description: '智能学习进度跟踪，个性化学习建议'
    },
    {
      icon: faTrophy,
      title: '人才孵化基地',
      description: '优秀学员推荐就业，职业发展支持'
    },
    {
      icon: faLaptop,
      title: '在线实践平台',
      description: '云端开发环境，随时随地练习编程'
    }
  ];

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category.toLowerCase().includes(activeCategory));

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
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                AI学院
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              VR虚拟实验室，AI评估系统，人才孵化基地，打造最专业的AI教育平台
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索课程、讲师..."
                  className="w-full px-6 py-4 pl-12 pr-16 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-black font-semibold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-200">
                  搜索
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">100+</div>
                <div className="text-gray-400">精品课程</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">50+</div>
                <div className="text-gray-400">专业讲师</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">10K+</div>
                <div className="text-gray-400">学员数量</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">95%</div>
                <div className="text-gray-400">就业率</div>
              </div>
            </div>
          </motion.div>
        </div>
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
              学院特色
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              创新的教学模式，先进的技术设施，为学员提供最佳的学习体验
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={feature.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-orange-400 to-red-400 text-black'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Course Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-gray-500" />
                    {course.featured && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-black text-xs font-bold rounded">
                        推荐
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FontAwesomeIcon icon={faPlay} className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  {/* Course Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-400">{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faClock} className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-400">{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                        <span className="text-sm text-gray-300">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-400">{course.students} 学员</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-orange-400">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-black font-semibold rounded-lg text-sm hover:from-orange-500 hover:to-red-500 transition-all duration-200 flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>立即报名</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              开启AI学习之旅
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              专业的课程体系，优秀的师资团队，助您成为AI领域的专业人才
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-red-400 text-black font-bold rounded-lg text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                免费试听
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-orange-400 text-orange-400 font-bold rounded-lg text-lg hover:bg-orange-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                咨询课程
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AcademyPage; 