#!/bin/bash

echo "🚀 开始部署Airoam网站到生产环境..."

# 检查环境
echo "📋 检查部署环境..."
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装"
    exit 1
fi

# 构建前端
echo "🔨 构建前端应用..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 前端构建失败"
    exit 1
fi

# 构建后端
echo "🔨 构建后端应用..."
cd ../backend
python manage.py collectstatic --noinput
python manage.py migrate

# 创建Docker镜像
echo "🐳 创建Docker镜像..."
cd ..
docker build -t airoam:latest .

# 停止旧容器
echo "🛑 停止旧容器..."
docker stop airoam-frontend airoam-backend 2>/dev/null || true
docker rm airoam-frontend airoam-backend 2>/dev/null || true

# 启动新容器
echo "🚀 启动新容器..."
docker run -d --name airoam-backend -p 8000:8000 airoam:latest python manage.py runserver 0.0.0.0:8000
docker run -d --name airoam-frontend -p 3000:3000 airoam:latest npm start

# 配置Nginx
echo "🌐 配置Nginx..."
sudo tee /etc/nginx/sites-available/airoam.net << EOF
server {
    listen 80;
    server_name airoam.net www.airoam.net;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
    
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# 启用站点
sudo ln -sf /etc/nginx/sites-available/airoam.net /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 配置SSL证书
echo "🔒 配置SSL证书..."
if command -v certbot &> /dev/null; then
    sudo certbot --nginx -d airoam.net -d www.airoam.net --non-interactive --agree-tos --email airoam.net@gmail.com
fi

# 启动爬虫服务
echo "🕷️ 启动爬虫服务..."
cd crawler
scrapy crawl ainews -s LOG_LEVEL=INFO

echo "✅ 部署完成！"
echo "🌐 网站地址: https://airoam.net"
echo "📧 联系邮箱: airoam.net@gmail.com"
echo "📊 监控地址: https://airoam.net/admin" 