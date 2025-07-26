#!/bin/bash

echo "🛑 停止Airoam服务..."

# 停止后端服务
if [ -f backend.pid ]; then
    BACKEND_PID=$(cat backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID
        echo "✅ 后端服务已停止 (PID: $BACKEND_PID)"
    else
        echo "⚠️ 后端服务进程不存在"
    fi
    rm -f backend.pid
else
    echo "⚠️ 未找到后端PID文件"
fi

# 停止前端服务
if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        kill $FRONTEND_PID
        echo "✅ 前端服务已停止 (PID: $FRONTEND_PID)"
    else
        echo "⚠️ 前端服务进程不存在"
    fi
    rm -f frontend.pid
else
    echo "⚠️ 未找到前端PID文件"
fi

# 强制停止相关进程
pkill -f "python manage.py runserver" 2>/dev/null && echo "✅ 强制停止后端进程"
pkill -f "npm start" 2>/dev/null && echo "✅ 强制停止前端进程"
pkill -f "next start" 2>/dev/null && echo "✅ 强制停止Next.js进程"

echo "🎉 所有服务已停止" 