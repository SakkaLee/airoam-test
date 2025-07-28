'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStore, 
  faUsers, 
  faRocket, 
  faGraduationCap,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../components/AIHeader';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <AIHeader />
      
      <div className="container mx-auto px-4 py-16">
          <motion.div
          className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          >
          <h1 className="text-5xl font-bold text-white mb-6">
            Airoam - Leading Global AI News Platform
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aggregating the latest AI technology trends, research breakthroughs, and industry insights worldwide. 
            We connect every corner of the AI world, making knowledge accessible without boundaries.
            </p>
          </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
              key={feature.title}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <FontAwesomeIcon icon={feature.icon} className="text-white text-xl" />
                  </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/tools"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            >
            开始探索
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </motion.div>
        </div>
    </div>
  );
};

export default HomePage;
