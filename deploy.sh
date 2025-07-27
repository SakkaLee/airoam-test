#!/bin/bash

echo "🚀 Starting deployment of Airoam AI Tech Platform..."

# 进入前端目录
cd frontend

# 安装依赖
echo "📦 Installing dependencies..."
npm install

# 构建生产版本
echo "🔨 Building production version..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# 提交部署配置
cd ..
git add .
git commit -m "Add deployment configuration for airoam.net"

# 推送到远程仓库
echo "📤 Pushing to remote repository..."
git push origin main

echo "🎉 Deployment configuration completed!"
echo "📋 Next steps:"
echo "1. Connect your GitHub repository to Vercel"
echo "2. Set custom domain: airoam.net"
echo "3. Configure environment variables"
echo "4. Deploy!" 