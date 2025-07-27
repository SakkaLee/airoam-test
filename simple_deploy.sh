#!/bin/bash

echo "🚀 Airoam简化部署脚本"
echo "========================"

# 停止现有服务
echo "🛑 停止现有服务..."
./stop_services.sh

# 清理端口
echo "🧹 清理端口占用..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "端口3000已清理"
lsof -ti:8000 | xargs kill -9 2>/dev/null || echo "端口8000已清理"

# 启动后端服务（简化版本）
echo "🚀 启动后端服务..."
cd backend
source venv/bin/activate

# 使用简化的Django设置
export DJANGO_SETTINGS_MODULE=airoam.settings
export PYTHONPATH=/Users/leeshaka/cursor\ test/backend

# 启动后端服务
nohup python manage.py runserver 0.0.0.0:8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../backend.pid
echo "后端服务PID: $BACKEND_PID"

cd ..

# 启动前端服务
echo "🚀 启动前端服务..."
cd frontend
nohup npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../frontend.pid
echo "前端服务PID: $FRONTEND_PID"

cd ..

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
echo "🔍 检查服务状态..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ 后端API启动成功"
else
    echo "❌ 后端API启动失败"
fi

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ 前端服务启动成功"
else
    echo "❌ 前端服务启动失败"
fi

echo ""
echo "🌐 访问地址:"
echo "前端: http://localhost:3000"
echo "后端API: http://localhost:8000"
echo ""
echo "📋 服务管理:"
echo "停止服务: ./stop_services.sh"
echo "查看日志: tail -f backend.log 或 tail -f frontend.log" 