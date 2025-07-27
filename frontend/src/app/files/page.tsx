'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFile, 
  faDownload, 
  faShare, 
  faTrash, 
  faEye,
  faEyeSlash,
  faCalendar,
  faUser,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
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

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showPublic, setShowPublic] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/files/', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files);
      } else {
        setError('获取文件列表失败');
      }
    } catch (error) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/public-files/');
      
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files);
      } else {
        setError('获取公开文件列表失败');
      }
    } catch (error) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showPublic) {
      fetchPublicFiles();
    } else {
      fetchFiles();
    }
  }, [showPublic]);

  const handleUploadSuccess = (file: FileInfo) => {
    setFiles(prev => [file, ...prev]);
    setShowUpload(false);
  };

  const handleUploadError = (error: string) => {
    setError(error);
  };

  const handleDelete = async (fileId: number) => {
    if (!confirm('确定要删除这个文件吗？')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/files/${fileId}/`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setFiles(prev => prev.filter(file => file.id !== fileId));
      } else {
        setError('删除文件失败');
      }
    } catch (error) {
      setError('网络错误');
    }
  };

  const handleDownload = (file: FileInfo) => {
    window.open(file.download_url, '_blank');
  };

  const handleShare = async (fileId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/files/${fileId}/share/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const shareUrl = data.share.share_url;
        navigator.clipboard.writeText(shareUrl);
        alert('分享链接已复制到剪贴板');
      } else {
        setError('创建分享链接失败');
      }
    } catch (error) {
      setError('网络错误');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📁';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-blue-400 animate-spin mb-4" />
          <p className="text-white">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            {showPublic ? '公开文件' : '我的文件'}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowPublic(!showPublic)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={showPublic ? faEyeSlash : faEye} className="w-4 h-4" />
              {showPublic ? '我的文件' : '公开文件'}
            </button>
            {!showPublic && (
              <button
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                上传文件
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {showUpload && (
          <div className="mb-8">
            <FileUpload 
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>
        )}

        {files.length === 0 ? (
          <div className="text-center py-12">
            <FontAwesomeIcon icon={faFile} className="w-16 h-16 text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">
              {showPublic ? '暂无公开文件' : '暂无文件，开始上传吧！'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <div key={file.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFileIcon(file.file_type)}</span>
                    <div>
                      <h3 className="text-white font-medium truncate max-w-48">
                        {file.original_filename}
                      </h3>
                      <p className="text-sm text-slate-400">{file.file_size_display}</p>
                    </div>
                  </div>
                  {!showPublic && (
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {file.description && (
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {file.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                    {formatDate(file.upload_date)}
                  </div>
                  {showPublic && file.user && (
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUser} className="w-3 h-3" />
                      {file.user.username}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faDownload} className="w-3 h-3" />
                    下载
                  </button>
                  {!showPublic && (
                    <button
                      onClick={() => handleShare(file.id)}
                      className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <FontAwesomeIcon icon={faShare} className="w-3 h-3" />
                      分享
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage; 