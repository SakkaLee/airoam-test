'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPen, 
  faCopy, 
  faDownload,
  faSpinner,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../../components/AIHeader';

const TextGeneratorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    style: 'creative',
    length: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [usage, setUsage] = useState<{tokens: number, cost: number} | null>(null);

  const styles = [
    { value: 'creative', label: '创意文案', description: '富有想象力和创新性' },
    { value: 'professional', label: '专业文案', description: '正式、权威、可信' },
    { value: 'casual', label: '轻松文案', description: '友好、随意、亲切' },
    { value: 'persuasive', label: '说服文案', description: '有说服力、能促进行动' }
  ];

  const lengths = [
    { value: 'short', label: '简短', description: '50-100字' },
    { value: 'medium', label: '中等', description: '100-300字' },
    { value: 'long', label: '详细', description: '300-500字' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prompt.trim()) {
      setError('请输入文案需求');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setUsage(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/ai/text-generator/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.text);
        setUsage(data.usage);
      } else {
        setError(data.error || '生成失败，请重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        // 可以添加一个临时的成功提示
      } catch (error) {
        setError('复制失败');
      }
    }
  };

  const downloadText = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `文案_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

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
              智能文案生成器
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            基于 GPT-4 的智能文案创作工具，支持多种风格和长度，让您的文案创作更高效
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入表单 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FontAwesomeIcon icon={faPen} className="mr-3 text-cyan-400" />
              文案需求
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 文案需求 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  文案需求 *
                </label>
                <textarea
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                  placeholder="请详细描述您的文案需求，例如：产品特点、目标受众、使用场景等..."
                  required
                />
              </div>

              {/* 文案风格 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  文案风格
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((style) => (
                    <label key={style.value} className="flex items-center p-3 bg-gray-700/30 border border-gray-600 rounded-lg cursor-pointer hover:border-cyan-400/50 transition-colors">
                      <input
                        type="radio"
                        name="style"
                        value={style.value}
                        checked={formData.style === style.value}
                        onChange={handleInputChange}
                        className="mr-3 text-cyan-400"
                      />
                      <div>
                        <div className="font-medium text-white">{style.label}</div>
                        <div className="text-sm text-gray-400">{style.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 文案长度 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  文案长度
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {lengths.map((length) => (
                    <label key={length.value} className="flex items-center p-3 bg-gray-700/30 border border-gray-600 rounded-lg cursor-pointer hover:border-cyan-400/50 transition-colors">
                      <input
                        type="radio"
                        name="length"
                        value={length.value}
                        checked={formData.length === length.value}
                        onChange={handleInputChange}
                        className="mr-3 text-cyan-400"
                      />
                      <div>
                        <div className="font-medium text-white">{length.label}</div>
                        <div className="text-sm text-gray-400">{length.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 提交按钮 */}
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
                    生成中...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    生成文案
                  </>
                )}
              </motion.button>
            </form>

            {/* 错误提示 */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
              >
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faTimes} className="text-red-400 mr-2" />
                  <span className="text-red-400">{error}</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* 生成结果 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">生成结果</h2>

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

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <motion.button
                    onClick={copyToClipboard}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                    复制文案
                  </motion.button>
                  <motion.button
                    onClick={downloadText}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    下载文案
                  </motion.button>
                </div>

                {/* 使用统计 */}
                {usage && (
                  <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">使用统计</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Token 使用量:</span>
                        <span className="text-white ml-2">{usage.tokens}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">预估成本:</span>
                        <span className="text-white ml-2">¥{usage.cost.toFixed(4)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {!loading && !result && (
              <div className="text-center py-12 text-gray-400">
                <FontAwesomeIcon icon={faPen} className="text-4xl mb-4" />
                <p>填写左侧表单，点击生成按钮开始创作</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TextGeneratorPage; 