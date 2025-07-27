#!/bin/bash

echo "🚀 启动 Airoam 文件上传系统..."

# 检查后端是否已运行
if lsof -i :8000 > /dev/null 2>&1; then
    echo "✅ Django后端已在运行 (端口 8000)"
else
    echo "📡 启动Django后端服务器..."
    cd backend
    source venv/bin/activate
    python manage.py runserver 8000 --settings=airoam.settings_minimal &
    cd ..
    sleep 3
fi

# 检查前端是否已运行
if lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ Next.js前端已在运行 (端口 3000)"
else
    echo "🌐 启动Next.js前端服务器..."
    cd frontend
    npm run dev &
    cd ..
    sleep 5
fi

echo ""
echo "🎉 系统启动完成！"
echo ""
echo "📊 访问地址："
echo "• 主页: http://localhost:3000"
echo "• 文件上传演示: http://localhost:3000/upload-demo"
echo "• 文件管理: http://localhost:3000/files"
echo "• 后端API: http://localhost:8000/api/"
echo ""
echo "🛑 停止服务器: 按 Ctrl+C 或运行 stop_servers.sh"
echo "" 