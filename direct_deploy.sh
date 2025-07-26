#!/bin/bash

echo "🚀 Airoam网站直接部署脚本"
echo "================================"

# 检查环境
echo "📋 检查部署环境..."
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装"
    exit 1
fi

if ! command -v nginx &> /dev/null; then
    echo "⚠️ Nginx未安装，将使用内置服务器"
fi

# 停止现有服务
echo "🛑 停止现有服务..."
pkill -f "python manage.py runserver" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# 构建前端
echo "🔨 构建前端应用..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 前端构建失败"
    exit 1
fi
cd ..

# 构建后端
echo "🔨 构建后端应用..."
cd backend
source ../backend_venv/bin/activate
python manage.py collectstatic --noinput
python manage.py migrate
cd ..

# 启动后端服务
echo "🚀 启动后端服务..."
cd backend
source ../backend_venv/bin/activate
nohup python manage.py runserver 0.0.0.0:8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务PID: $BACKEND_PID"
cd ..

# 启动前端服务
echo "🚀 启动前端服务..."
cd frontend
nohup npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端服务PID: $FRONTEND_PID"
cd ..

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
if curl -s http://localhost:8000/api/news/ > /dev/null; then
    echo "✅ 后端API运行正常"
else
    echo "❌ 后端API启动失败"
    exit 1
fi

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务运行正常"
else
    echo "❌ 前端服务启动失败"
    exit 1
fi

# 保存PID文件
echo $BACKEND_PID > backend.pid
echo $FRONTEND_PID > frontend.pid

echo "🎉 部署完成！"
echo "🌐 前端地址: http://localhost:3000"
echo "🔌 后端API: http://localhost:8000"
echo "📧 联系邮箱: airoam.net@gmail.com"
echo ""
echo "📋 服务管理："
echo "停止服务: ./stop_services.sh"
echo "查看日志: tail -f backend.log 或 tail -f frontend.log"
echo ""
echo "🌐 下一步：配置域名DNS指向服务器IP，然后运行Nginx配置" 