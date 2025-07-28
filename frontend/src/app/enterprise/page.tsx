'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faCode, 
  faGraduationCap,
  faCalculator,
  faSpinner,
  faTimes,
  faCheck,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../components/AIHeader';

const EnterprisePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consultation');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  
  // AI 咨询状态
  const [consultationData, setConsultationData] = useState({
    company_name: '',
    industry: '',
    business_goals: '',
    current_tech: '',
    budget_range: '',
    timeline: ''
  });
  
  // 定制开发状态
  const [developmentData, setDevelopmentData] = useState({
    project_name: '',
    project_type: 'web',
    requirements: '',
    features: '',
    timeline: '',
    budget: ''
  });
  
  // 技术培训状态
  const [trainingData, setTrainingData] = useState({
    company_name: '',
    team_size: '',
    skill_level: 'beginner',
    focus_areas: '',
    training_format: 'online',
    duration: ''
  });
  
  // 报价状态
  const [quoteData, setQuoteData] = useState({
    solution_type: 'consultation',
    company_size: '',
    project_scope: '',
    timeline: '',
    requirements: ''
  });

  const handleInputChange = (formData: any, setFormData: any, field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consultationData.company_name || !consultationData.business_goals) {
      setError('请填写公司名称和业务目标');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/enterprise/consultation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.consultation);
      } else {
        setError(data.error || '咨询失败，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const handleDevelopment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!developmentData.project_name || !developmentData.requirements) {
      setError('请填写项目名称和需求描述');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/enterprise/development/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...developmentData,
          features: developmentData.features.split(',').map(f => f.trim()).filter(f => f)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.development_plan);
      } else {
        setError(data.error || '方案生成失败，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const handleTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trainingData.company_name || !trainingData.focus_areas) {
      setError('请填写公司名称和培训重点');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/enterprise/training/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...trainingData,
          focus_areas: trainingData.focus_areas.split(',').map(f => f.trim()).filter(f => f)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.training_plan);
      } else {
        setError(data.error || '培训方案生成失败，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quoteData.solution_type || !quoteData.project_scope) {
      setError('请选择解决方案类型和项目范围');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/enterprise/quote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.quote);
      } else {
        setError(data.error || '报价生成失败，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'consultation', name: 'AI 咨询', icon: faBuilding },
    { id: 'development', name: '定制开发', icon: faCode },
    { id: 'training', name: '技术培训', icon: faGraduationCap },
    { id: 'quote', name: '获取报价', icon: faCalculator }
  ];

  const projectTypes = [
    { value: 'web', label: 'Web 应用' },
    { value: 'mobile', label: '移动应用' },
    { value: 'ai', label: 'AI 系统' },
    { value: 'data', label: '数据分析' }
  ];

  const skillLevels = [
    { value: 'beginner', label: '初级' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' }
  ];

  const trainingFormats = [
    { value: 'online', label: '在线培训' },
    { value: 'offline', label: '线下培训' },
    { value: 'hybrid', label: '混合培训' }
  ];

  const solutionTypes = [
    { value: 'consultation', label: 'AI 咨询' },
    { value: 'development', label: '定制开发' },
    { value: 'training', label: '技术培训' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <AIHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              企业解决方案
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            专业的企业级AI解决方案，助力企业数字化转型，提升竞争力
          </p>
        </motion.div>

        {/* 标签页导航 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-400 to-green-400 text-black' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={tab.icon} className="mr-2" />
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* 错误提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTimes} className="text-red-400 mr-2" />
              <span className="text-red-400">{error}</span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 表单区域 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            {/* AI 咨询表单 */}
            {activeTab === 'consultation' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FontAwesomeIcon icon={faBuilding} className="mr-3 text-cyan-400" />
                  AI 技术咨询
                </h2>
                
                <form onSubmit={handleConsultation} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      公司名称 *
                    </label>
                    <input
                      type="text"
                      value={consultationData.company_name}
                      onChange={(e) => handleInputChange(consultationData, setConsultationData, 'company_name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="请输入公司名称"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      所属行业
                    </label>
                    <input
                      type="text"
                      value={consultationData.industry}
                      onChange={(e) => handleInputChange(consultationData, setConsultationData, 'industry', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="例如：金融、教育、医疗、制造等"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      业务目标 *
                    </label>
                    <textarea
                      value={consultationData.business_goals}
                      onChange={(e) => handleInputChange(consultationData, setConsultationData, 'business_goals', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                      placeholder="请详细描述您的业务目标和AI应用需求..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      当前技术栈
                    </label>
                    <input
                      type="text"
                      value={consultationData.current_tech}
                      onChange={(e) => handleInputChange(consultationData, setConsultationData, 'current_tech', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="例如：Python、Java、云服务等"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        预算范围
                      </label>
                      <input
                        type="text"
                        value={consultationData.budget_range}
                        onChange={(e) => handleInputChange(consultationData, setConsultationData, 'budget_range', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：10-50万"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        时间要求
                      </label>
                      <input
                        type="text"
                        value={consultationData.timeline}
                        onChange={(e) => handleInputChange(consultationData, setConsultationData, 'timeline', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：3-6个月"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        分析中...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                        获取咨询建议
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}

            {/* 定制开发表单 */}
            {activeTab === 'development' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FontAwesomeIcon icon={faCode} className="mr-3 text-cyan-400" />
                  定制开发服务
                </h2>
                
                <form onSubmit={handleDevelopment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      项目名称 *
                    </label>
                    <input
                      type="text"
                      value={developmentData.project_name}
                      onChange={(e) => handleInputChange(developmentData, setDevelopmentData, 'project_name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="请输入项目名称"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      项目类型
                    </label>
                    <select
                      value={developmentData.project_type}
                      onChange={(e) => handleInputChange(developmentData, setDevelopmentData, 'project_type', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      需求描述 *
                    </label>
                    <textarea
                      value={developmentData.requirements}
                      onChange={(e) => handleInputChange(developmentData, setDevelopmentData, 'requirements', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                      placeholder="请详细描述项目需求和功能要求..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      功能特性
                    </label>
                    <input
                      type="text"
                      value={developmentData.features}
                      onChange={(e) => handleInputChange(developmentData, setDevelopmentData, 'features', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="用逗号分隔，例如：用户管理,数据分析,AI功能"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        时间要求
                      </label>
                      <input
                        type="text"
                        value={developmentData.timeline}
                        onChange={(e) => handleInputChange(developmentData, setDevelopmentData, 'timeline', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：3个月"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        预算范围
                      </label>
                      <input
                        type="text"
                        value={developmentData.budget}
                        onChange={(e) => handleInputChange(developmentData, setDevelopmentData, 'budget', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：50-100万"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        生成方案中...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCode} className="mr-2" />
                        生成开发方案
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}

            {/* 技术培训表单 */}
            {activeTab === 'training' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-cyan-400" />
                  技术培训方案
                </h2>
                
                <form onSubmit={handleTraining} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      公司名称 *
                    </label>
                    <input
                      type="text"
                      value={trainingData.company_name}
                      onChange={(e) => handleInputChange(trainingData, setTrainingData, 'company_name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="请输入公司名称"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        团队规模
                      </label>
                      <input
                        type="text"
                        value={trainingData.team_size}
                        onChange={(e) => handleInputChange(trainingData, setTrainingData, 'team_size', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：10-20人"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        技能水平
                      </label>
                      <select
                        value={trainingData.skill_level}
                        onChange={(e) => handleInputChange(trainingData, setTrainingData, 'skill_level', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      >
                        {skillLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      培训重点 *
                    </label>
                    <input
                      type="text"
                      value={trainingData.focus_areas}
                      onChange={(e) => handleInputChange(trainingData, setTrainingData, 'focus_areas', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="用逗号分隔，例如：机器学习,深度学习,数据分析"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        培训形式
                      </label>
                      <select
                        value={trainingData.training_format}
                        onChange={(e) => handleInputChange(trainingData, setTrainingData, 'training_format', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      >
                        {trainingFormats.map((format) => (
                          <option key={format.value} value={format.value}>
                            {format.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        培训时长
                      </label>
                      <input
                        type="text"
                        value={trainingData.duration}
                        onChange={(e) => handleInputChange(trainingData, setTrainingData, 'duration', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：2周"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        制定方案中...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                        制定培训方案
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}

            {/* 报价表单 */}
            {activeTab === 'quote' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FontAwesomeIcon icon={faCalculator} className="mr-3 text-cyan-400" />
                  获取报价
                </h2>
                
                <form onSubmit={handleQuote} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      解决方案类型 *
                    </label>
                    <select
                      value={quoteData.solution_type}
                      onChange={(e) => handleInputChange(quoteData, setQuoteData, 'solution_type', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      required
                    >
                      {solutionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      公司规模
                    </label>
                    <input
                      type="text"
                      value={quoteData.company_size}
                      onChange={(e) => handleInputChange(quoteData, setQuoteData, 'company_size', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="例如：50-100人"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      项目范围 *
                    </label>
                    <textarea
                      value={quoteData.project_scope}
                      onChange={(e) => handleInputChange(quoteData, setQuoteData, 'project_scope', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                      placeholder="请描述项目范围和具体需求..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        时间要求
                      </label>
                      <input
                        type="text"
                        value={quoteData.timeline}
                        onChange={(e) => handleInputChange(quoteData, setQuoteData, 'timeline', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：3个月"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        具体需求
                      </label>
                      <input
                        type="text"
                        value={quoteData.requirements}
                        onChange={(e) => handleInputChange(quoteData, setQuoteData, 'requirements', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        placeholder="例如：AI模型开发"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                        计算报价中...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                        获取报价
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>

          {/* 结果展示区域 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">方案结果</h2>
            
            {loading && (
              <div className="flex items-center justify-center py-12">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-cyan-400" />
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    复制方案
                  </motion.button>
                  <motion.button
                    onClick={() => window.print()}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                    打印方案
                  </motion.button>
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <div className="text-center py-12 text-gray-400">
                <FontAwesomeIcon icon={faBuilding} className="text-4xl mb-4" />
                <p>填写左侧表单，获取专业的解决方案</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePage; 