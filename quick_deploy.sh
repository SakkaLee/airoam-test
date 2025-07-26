#!/bin/bash

echo "🚀 Airoam网站快速部署脚本"
echo "================================"

# 检查当前状态
echo "📊 检查当前服务状态..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ 前端服务运行正常"
else
    echo "❌ 前端服务未运行"
fi

if curl -s http://localhost:8000/api/news/ > /dev/null; then
    echo "✅ 后端API运行正常"
else
    echo "❌ 后端API未运行"
fi

# 更新代码
echo "🔄 更新代码..."
git pull origin main

# 重启服务
echo "🔄 重启服务..."
cd backend
source ../backend_venv/bin/activate
python manage.py migrate
python manage.py collectstatic --noinput
cd ..

cd frontend
npm install
npm run build
cd ..

# 检查服务状态
echo "🔍 检查服务状态..."
sleep 5

if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ 前端服务重启成功"
else
    echo "❌ 前端服务重启失败"
fi

if curl -s http://localhost:8000/api/news/ > /dev/null; then
    echo "✅ 后端API重启成功"
else
    echo "❌ 后端API重启失败"
fi

echo "🎉 部署完成！"
echo "🌐 本地访问: http://localhost:3001"
echo "📧 联系邮箱: airoam.net@gmail.com"
echo ""
echo "📋 下一步操作："
echo "1. 配置域名DNS指向服务器IP"
echo "2. 运行 ./deploy.sh 进行生产环境部署"
echo "3. 配置SSL证书和Nginx"
echo "4. 设置定时任务运行爬虫" 