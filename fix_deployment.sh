#!/bin/bash

echo "🔧 修复Airoam部署问题..."

# 停止所有相关服务
echo "🛑 停止现有服务..."
./stop_services.sh

# 清理端口
echo "🧹 清理端口占用..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "端口3000已清理"
lsof -ti:8000 | xargs kill -9 2>/dev/null || echo "端口8000已清理"

# 检查Python环境
echo "🐍 检查Python环境..."
python3 --version
which python3

# 检查Node.js环境
echo "📦 检查Node.js环境..."
node --version
npm --version

# 设置后端环境
echo "🔧 设置后端环境..."
cd backend

# 创建虚拟环境
if [ ! -d "venv" ]; then
    echo "📦 创建Python虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 升级pip
pip install --upgrade pip

# 安装依赖
echo "📦 安装后端依赖..."
pip install -r requirements.txt

# 运行数据库迁移
echo "🗄️ 运行数据库迁移..."
python manage.py migrate --run-syncdb

# 收集静态文件
echo "📁 收集静态文件..."
python manage.py collectstatic --noinput

# 返回根目录
cd ..

# 设置前端环境
echo "🔧 设置前端环境..."
cd frontend

# 安装依赖
echo "📦 安装前端依赖..."
npm ci

# 构建前端
echo "🏗️ 构建前端..."
npm run build

# 返回根目录
cd ..

echo "✅ 环境设置完成！"
echo "🚀 现在可以运行 ./direct_deploy.sh 启动服务" 