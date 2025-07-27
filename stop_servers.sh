#!/bin/bash

echo "🛑 停止 Airoam 文件上传系统..."

# 停止Django后端服务器
echo "📡 停止Django后端服务器..."
pkill -f "python manage.py runserver 8000"

# 停止Next.js前端服务器
echo "🌐 停止Next.js前端服务器..."
pkill -f "next dev"

# 等待进程结束
sleep 2

# 检查端口是否已释放
if ! lsof -i :8000 > /dev/null 2>&1; then
    echo "✅ Django后端已停止"
else
    echo "⚠️  Django后端可能仍在运行"
fi

if ! lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ Next.js前端已停止"
else
    echo "⚠️  Next.js前端可能仍在运行"
fi

echo ""
echo "🎉 系统已停止！"
echo "" 