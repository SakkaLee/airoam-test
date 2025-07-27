'use client';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudUploadAlt, 
  faFile, 
  faTrash, 
  faDownload, 
  faShare,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

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

interface FileUploadProps {
  onUploadSuccess?: (file: FileInfo) => void;
  onUploadError?: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // 检查文件大小 (100MB限制)
    if (file.size > 100 * 1024 * 1024) {
      onUploadError?.('文件大小不能超过100MB');
      return;
    }

    // 检查文件类型
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'text/csv',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip', 'application/x-rar-compressed'
    ];

    if (!allowedTypes.includes(file.type)) {
      onUploadError?.('不支持的文件类型');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('description', description);
    formData.append('is_public', isPublic.toString());

    try {
      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        onUploadSuccess?.(result.file);
        setSelectedFile(null);
        setDescription('');
        setIsPublic(false);
      } else {
        const error = await response.json();
        onUploadError?.(error.error || '上传失败');
      }
    } catch (error) {
      onUploadError?.('网络错误，请重试');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faCloudUploadAlt} className="w-6 h-6 text-blue-400" />
        文件上传
      </h2>

      {/* 拖拽上传区域 */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-slate-600 hover:border-slate-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FontAwesomeIcon 
          icon={faCloudUploadAlt} 
          className="w-12 h-12 text-slate-400 mb-4" 
        />
        <p className="text-slate-300 mb-2">
          拖拽文件到此处，或{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            点击选择文件
          </button>
        </p>
        <p className="text-sm text-slate-500">
          支持 JPG, PNG, PDF, DOC, XLS, ZIP 等格式，最大 100MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* 文件信息 */}
      {selectedFile && (
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faFile} className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <p className="text-white font-medium">{selectedFile.name}</p>
              <p className="text-sm text-slate-400">
                {formatFileSize(selectedFile.size)} • {selectedFile.type}
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-red-400 hover:text-red-300"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 上传选项 */}
      {selectedFile && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              文件描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
              placeholder="可选：添加文件描述..."
              rows={3}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 text-blue-400 bg-slate-700 border-slate-600 rounded focus:ring-blue-400"
            />
            <label htmlFor="isPublic" className="text-sm text-slate-300">
              设为公开文件（其他人可以查看和下载）
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" />
                上传中...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCloudUploadAlt} className="w-4 h-4" />
                上传文件
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 