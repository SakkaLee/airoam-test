'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faRobot, 
  faLightbulb,
  faUsers,
  faPen,
  faHeart,
  faShare,
  faSpinner,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import AIHeader from '../../components/AIHeader';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-assistant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // AI 助手状态
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  
  // 内容推荐状态
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState('');
  
  // 社区讨论状态
  const [discussionTopic, setDiscussionTopic] = useState('');
  const [discussionContent, setDiscussionContent] = useState('');
  const [discussions, setDiscussions] = useState([
    {
      id: '1',
      topic: 'AI 技术发展趋势',
      content: '大家觉得未来 AI 技术会如何发展？有哪些值得关注的方向？',
      user: 'AI爱好者',
      likes: 15,
      replies: 8,
      time: '2小时前'
    },
    {
      id: '2',
      topic: '机器学习入门建议',
      content: '想学习机器学习，有什么好的入门路径和资源推荐吗？',
      user: '新手小白',
      likes: 23,
      replies: 12,
      time: '5小时前'
    }
  ]);

  const handleAIQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('请输入您的问题');
      return;
    }

    setLoading(true);
    setError('');
    setAiAnswer('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/community/ai-assistant/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          context,
          user_id: 'anonymous'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAiAnswer(data.answer);
      } else {
        setError(data.error || 'AI 助手暂时无法回答，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    if (!interests.trim()) {
      setError('请输入您的兴趣');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/community/recommendations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interests: interests.split(',').map(i => i.trim()),
          history: [],
          category: 'all'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.error || '推荐失败，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!discussionTopic.trim() || !discussionContent.trim()) {
      setError('请输入话题和内容');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
      const response = await fetch(`${API_BASE}/api/community/discussions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: discussionTopic,
          content: discussionContent,
          user_id: 'anonymous'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 添加到本地讨论列表
        const newDiscussion = {
          id: data.discussion.id,
          topic: discussionTopic,
          content: discussionContent,
          user: '我',
          likes: 0,
          replies: 0,
          time: '刚刚'
        };
        setDiscussions([newDiscussion, ...discussions]);
        setDiscussionTopic('');
        setDiscussionContent('');
      } else {
        setError(data.error || '发布失败，请稍后重试');
      }
    } catch (error) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'ai-assistant', name: 'AI 助手', icon: faRobot },
    { id: 'recommendations', name: '内容推荐', icon: faLightbulb },
    { id: 'discussions', name: '社区讨论', icon: faComments },
    { id: 'create', name: '发布讨论', icon: faPen }
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
              智能社区
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            NLP精准推荐，AI问答机器人，内容创作助手，让AI技术触手可及
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

        {/* AI 助手 */}
        {activeTab === 'ai-assistant' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FontAwesomeIcon icon={faRobot} className="mr-3 text-cyan-400" />
                AI 智能助手
              </h2>
              
              <form onSubmit={handleAIQuestion} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    您的问题 *
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                    placeholder="请详细描述您的问题..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    背景信息（可选）
                  </label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                    placeholder="提供更多背景信息，帮助AI更好地理解您的问题..."
                  />
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
                      思考中...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faRobot} className="mr-2" />
                      询问AI助手
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">AI 回答</h2>
              
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-cyan-400" />
                </div>
              )}

              {aiAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/30 border border-gray-600 rounded-lg p-4"
                >
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {aiAnswer}
                  </div>
                </motion.div>
              )}

              {!loading && !aiAnswer && (
                <div className="text-center py-12 text-gray-400">
                  <FontAwesomeIcon icon={faRobot} className="text-4xl mb-4" />
                  <p>在左侧输入您的问题，AI助手将为您提供专业解答</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 内容推荐 */}
        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FontAwesomeIcon icon={faLightbulb} className="mr-3 text-cyan-400" />
                智能内容推荐
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    您的兴趣
                  </label>
                  <textarea
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                    placeholder="请输入您的兴趣，用逗号分隔，例如：AI技术,机器学习,编程,设计..."
                  />
                </div>
                
                <motion.button
                  onClick={handleGetRecommendations}
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
                      <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                      获取推荐
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">推荐内容</h2>
              
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-cyan-400" />
                </div>
              )}

              {recommendations && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700/30 border border-gray-600 rounded-lg p-4"
                >
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {recommendations}
                  </div>
                </motion.div>
              )}

              {!loading && !recommendations && (
                <div className="text-center py-12 text-gray-400">
                  <FontAwesomeIcon icon={faLightbulb} className="text-4xl mb-4" />
                  <p>在左侧输入您的兴趣，AI将为您推荐相关内容</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 社区讨论 */}
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FontAwesomeIcon icon={faComments} className="mr-3 text-cyan-400" />
              社区讨论
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discussions.map((discussion) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold mb-2 text-white">{discussion.topic}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{discussion.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{discussion.user}</span>
                    <span>{discussion.time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                        <FontAwesomeIcon icon={faHeart} className="text-sm" />
                        <span className="text-sm">{discussion.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <FontAwesomeIcon icon={faComments} className="text-sm" />
                        <span className="text-sm">{discussion.replies}</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-green-400 transition-colors">
                      <FontAwesomeIcon icon={faShare} className="text-sm" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 发布讨论 */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FontAwesomeIcon icon={faPen} className="mr-3 text-cyan-400" />
              发布新讨论
            </h2>
            
            <form onSubmit={handleCreateDiscussion} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  讨论话题 *
                </label>
                <input
                  type="text"
                  value={discussionTopic}
                  onChange={(e) => setDiscussionTopic(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="请输入讨论话题..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  讨论内容 *
                </label>
                <textarea
                  value={discussionContent}
                  onChange={(e) => setDiscussionContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                  placeholder="请详细描述您的观点或问题..."
                  required
                />
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
                    发布中...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    发布讨论
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage; 