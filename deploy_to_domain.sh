#!/bin/bash

echo "🌐 Airoam域名部署脚本"
echo "========================"

# 获取服务器IP
echo "📡 获取服务器IP地址..."
SERVER_IP=$(curl -s ifconfig.me)
echo "服务器IP: $SERVER_IP"

# 检查必要工具
echo "📋 检查部署环境..."
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装"
    exit 1
fi

if ! command -v nginx &> /dev/null; then
    echo "⚠️ Nginx未安装，将安装Nginx"
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y nginx
    elif command -v yum &> /dev/null; then
        sudo yum install -y nginx
    elif command -v brew &> /dev/null; then
        brew install nginx
    else
        echo "❌ 无法安装Nginx，请手动安装"
        exit 1
    fi
fi

# 停止现有服务
echo "🛑 停止现有服务..."
./stop_services.sh

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

# 创建Nginx配置
echo "🔧 创建Nginx配置..."
sudo tee /etc/nginx/sites-available/airoam.net << EOF
server {
    listen 80;
    server_name airoam.net www.airoam.net;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Static files
    location /static/ {
        alias /Users/leeshaka/cursor\ test/backend/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}

# Redirect www to non-www
server {
    listen 80;
    server_name www.airoam.net;
    return 301 http://airoam.net\$request_uri;
}
EOF

# 启用站点
echo "🔧 启用Nginx站点..."
sudo ln -sf /etc/nginx/sites-available/airoam.net /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 启动服务
echo "🚀 启动服务..."
cd backend
source ../backend_venv/bin/activate
nohup python manage.py runserver 0.0.0.0:8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务PID: $BACKEND_PID"
cd ..

cd frontend
nohup npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端服务PID: $FRONTEND_PID"
cd ..

# 保存PID文件
echo $BACKEND_PID > backend.pid
echo $FRONTEND_PID > frontend.pid

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

# 配置SSL证书
echo "🔒 配置SSL证书..."
if command -v certbot &> /dev/null; then
    sudo certbot --nginx -d airoam.net -d www.airoam.net --non-interactive --agree-tos --email airoam.net@gmail.com
    echo "✅ SSL证书配置完成"
else
    echo "⚠️ Certbot未安装，请手动配置SSL证书"
    echo "安装命令: sudo apt-get install certbot python3-certbot-nginx"
fi

echo ""
echo "🎉 域名部署完成！"
echo "🌐 网站地址: http://airoam.net"
echo "🔒 HTTPS地址: https://airoam.net"
echo "📧 联系邮箱: airoam.net@gmail.com"
echo ""
echo "📋 DNS配置说明："
echo "请将以下DNS记录添加到您的域名提供商："
echo "A记录: airoam.net -> $SERVER_IP"
echo "A记录: www.airoam.net -> $SERVER_IP"
echo ""
echo "📊 监控地址："
echo "- 网站: https://airoam.net"
echo "- 管理后台: https://airoam.net/admin"
echo "- API文档: https://airoam.net/api/"
echo ""
echo "🔧 服务管理："
echo "停止服务: ./stop_services.sh"
echo "查看日志: tail -f backend.log 或 tail -f frontend.log"
echo "重启Nginx: sudo systemctl reload nginx" 