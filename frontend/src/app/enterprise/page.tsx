'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faBuilding,
  faChartLine,
  faUsers,
  faCog,
  faCheck,
  faArrowRight,
  faLightbulb,
  faShieldAlt,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../components/AIHeader';

const EnterprisePage: React.FC = () => {
  const solutions = [
    {
      id: 1,
      title: '智能客服系统',
      description: '基于NLP的智能客服机器人，7x24小时在线服务',
      features: ['多语言支持', '情感分析', '知识图谱', '无缝转人工'],
      price: '¥50,000/月起',
      icon: faUsers,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: '数据分析平台',
      description: '企业级数据分析和可视化平台，深度挖掘业务价值',
      features: ['实时数据处理', '智能报表生成', '预测分析', '多源数据整合'],
      price: '¥80,000/月起',
      icon: faChartLine,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: '内容创作助手',
      description: 'AI驱动的企业内容创作平台，提升营销效率',
      features: ['文案生成', '图像设计', '视频制作', '多平台发布'],
      price: '¥30,000/月起',
      icon: faLightbulb,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: '流程自动化',
      description: '智能工作流自动化，提升企业运营效率',
      features: ['流程设计', '智能审批', '异常检测', '性能监控'],
      price: '¥60,000/月起',
      icon: faCog,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    {
      icon: faRocket,
      title: '快速部署',
      description: '标准化解决方案，最快2周完成部署'
    },
    {
      icon: faShieldAlt,
      title: '安全可靠',
      description: '企业级安全保障，数据加密传输'
    },
    {
      icon: faGlobe,
      title: '全球服务',
      description: '7x24小时技术支持，覆盖全球客户'
    },
    {
      icon: faChartLine,
      title: '持续优化',
      description: 'AI模型持续学习，性能不断提升'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <AIHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300ffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                企业AI解决方案
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              定制化AI解决方案，从诊断到实施全流程服务，助力企业数字化转型
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-400 text-black font-bold rounded-lg text-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                免费咨询
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg text-lg hover:bg-green-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                查看案例
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  服务企业
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  客户满意度
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  2周
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  平均部署时间
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  技术支持
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              专业的AI技术团队，丰富的企业服务经验，为您提供最优质的解决方案
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={benefit.icon} className="text-2xl text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              核心解决方案
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              针对不同行业和场景，提供专业化的AI解决方案
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${solution.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full hover:border-green-400/50 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={solution.icon} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{solution.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">核心功能：</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-gray-300">
                          <FontAwesomeIcon icon={faCheck} className="text-green-400 text-sm" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">{solution.price}</span>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-black font-semibold rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-200 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>了解详情</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </motion.button>
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
              开启企业AI转型之旅
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              专业的AI顾问团队，为您量身定制数字化转型方案，助力企业实现智能化升级
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-400 text-black font-bold rounded-lg text-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                预约咨询
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg text-lg hover:bg-green-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                下载方案
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnterprisePage; 