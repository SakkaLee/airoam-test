'use client';
import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/FileUpload';

interface FileInfo {
  id: number;
  original_filename: string;
  file_size: number;
  file_size_display: string;
  file_type: string;
  upload_date: string;
  description: string;
  is_public: boolean;
  download_url: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

const UploadDemoPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [publicFiles, setPublicFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicFiles = async () => {
    try {
      setLoading(true);
              const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.airoam.net';
        const response = await fetch(`${API_BASE}/api/public-files/`);
      if (response.ok) {
        const data = await response.json();
        setPublicFiles(data.files);
      }
    } catch (error) {
      console.error('获取公开文件失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicFiles();
  }, []);

  const handleUploadSuccess = (file: FileInfo) => {
    setUploadedFiles(prev => [file, ...prev]);
    setPublicFiles(prev => [file, ...prev]); // 如果是公开文件，也添加到公开文件列表
    setError(null);
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  const handleDownload = (file: FileInfo) => {
    window.open(file.download_url, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🚀 文件上传演示
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            这是一个完整的文件上传系统演示，支持拖拽上传、文件管理、分享下载等功能
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 文件上传区域 */}
          <div>
            <FileUpload 
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>

          {/* 功能说明 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">✨ 功能特性</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-white font-medium">拖拽上传</h3>
                  <p className="text-slate-400 text-sm">支持拖拽文件到上传区域，简单便捷</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-white font-medium">文件类型支持</h3>
                  <p className="text-slate-400 text-sm">支持图片、文档、压缩包等多种格式</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-white font-medium">文件管理</h3>
                  <p className="text-slate-400 text-sm">查看、下载、删除、分享文件</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-white font-medium">分享功能</h3>
                  <p className="text-slate-400 text-sm">生成分享链接，支持过期时间和下载次数限制</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* 最近上传的文件 */}
        {uploadedFiles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">📤 最近上传</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{file.original_filename}</h3>
                      <p className="text-sm text-slate-400">{file.file_size_display}</p>
                    </div>
                  </div>
                  {file.description && (
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{file.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>{formatDate(file.upload_date)}</span>
                    <span className={file.is_public ? 'text-green-400' : 'text-orange-400'}>
                      {file.is_public ? '公开' : '私有'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDownload(file)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    下载文件
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 公开文件列表 */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">📋 公开文件</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-slate-400">加载中...</p>
            </div>
          ) : publicFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-slate-400 text-lg">暂无公开文件</p>
              <p className="text-slate-500 text-sm">上传一个文件并设为公开即可在此处看到</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {publicFiles.map((file) => (
                <div key={file.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{file.original_filename}</h3>
                      <p className="text-sm text-slate-400">{file.file_size_display}</p>
                    </div>
                  </div>
                  {file.description && (
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{file.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>{formatDate(file.upload_date)}</span>
                    {file.user && <span>上传者: {file.user.username}</span>}
                  </div>
                  <button
                    onClick={() => handleDownload(file)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                  >
                    下载文件
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API 信息 */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">🔧 API 接口</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-3">文件上传</h3>
              <div className="bg-slate-900 rounded-lg p-3 text-sm">
                <p className="text-green-400">POST /api/upload/</p>
                <p className="text-slate-400 mt-1">支持文件上传，可设置描述和公开状态</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">文件列表</h3>
              <div className="bg-slate-900 rounded-lg p-3 text-sm">
                <p className="text-blue-400">GET /api/files/</p>
                <p className="text-slate-400 mt-1">获取用户的文件列表</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">公开文件</h3>
              <div className="bg-slate-900 rounded-lg p-3 text-sm">
                <p className="text-purple-400">GET /api/public-files/</p>
                <p className="text-slate-400 mt-1">获取所有公开文件</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium mb-3">文件下载</h3>
              <div className="bg-slate-900 rounded-lg p-3 text-sm">
                <p className="text-orange-400">GET /api/files/{'{id}'}/download/</p>
                <p className="text-slate-400 mt-1">下载指定文件</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDemoPage; 