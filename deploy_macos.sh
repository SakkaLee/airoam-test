#!/bin/bash

echo "🌐 Airoam macOS域名部署脚本"
echo "============================"

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

# 检查并安装Nginx
if ! command -v nginx &> /dev/null; then
    echo "⚠️ Nginx未安装，正在安装..."
    if command -v brew &> /dev/null; then
        brew install nginx
    else
        echo "❌ 请先安装Homebrew: https://brew.sh"
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

# 构建后端（使用最小化设置避免段错误）
echo "🔨 构建后端应用..."
cd backend
source venv/bin/activate

# 使用最小化设置进行静态文件收集
echo "收集静态文件..."
python manage.py collectstatic --noinput --settings=airoam.settings_minimal

echo "运行数据库迁移..."
python manage.py migrate --settings=airoam.settings_minimal

cd ..

# 创建Nginx配置目录（如果不存在）
echo "🔧 创建Nginx配置..."
NGINX_CONF_DIR="/opt/homebrew/etc/nginx"
if [ ! -d "$NGINX_CONF_DIR/sites-available" ]; then
    sudo mkdir -p "$NGINX_CONF_DIR/sites-available"
fi
if [ ! -d "$NGINX_CONF_DIR/sites-enabled" ]; then
    sudo mkdir -p "$NGINX_CONF_DIR/sites-enabled"
fi

# 创建Nginx配置
sudo tee "$NGINX_CONF_DIR/sites-available/airoam.net" << EOF
server {
    listen 80;
    server_name airoam.net www.airoam.net localhost;
    
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
        alias "/Users/leeshaka/cursor test/backend/staticfiles/";
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
EOF

# 启用站点
echo "🔧 启用Nginx站点..."
sudo ln -sf "$NGINX_CONF_DIR/sites-available/airoam.net" "$NGINX_CONF_DIR/sites-enabled/"

# 更新主Nginx配置
sudo tee "$NGINX_CONF_DIR/nginx.conf" << EOF
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    
    sendfile        on;
    keepalive_timeout  65;
    
    include sites-enabled/*;
}
EOF

# 测试Nginx配置
sudo nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Nginx配置测试失败"
    exit 1
fi

# 重启Nginx
echo "🔄 重启Nginx..."
sudo nginx -s reload

# 启动服务
echo "🚀 启动服务..."

# 启动后端服务（使用最小化设置）
cd backend
source venv/bin/activate
echo "启动后端服务..."
nohup python manage.py runserver 0.0.0.0:8000 --settings=airoam.settings_minimal > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务PID: $BACKEND_PID"
cd ..

# 启动前端服务
cd frontend
echo "启动前端服务..."
nohup npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端服务PID: $FRONTEND_PID"
cd ..

# 保存PID文件
echo $BACKEND_PID > backend.pid
echo $FRONTEND_PID > frontend.pid

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 15

# 检查服务状态
echo "🔍 检查服务状态..."
if curl -s http://localhost:8000/api/news/ > /dev/null 2>&1; then
    echo "✅ 后端API运行正常"
else
    echo "⚠️ 后端API可能未完全启动，但继续部署..."
fi

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ 前端服务运行正常"
else
    echo "❌ 前端服务启动失败"
    exit 1
fi

echo ""
echo "🎉 域名部署完成！"
echo "🌐 网站地址: http://localhost"
echo "🌐 外部访问: http://$SERVER_IP"
echo "📧 联系邮箱: airoam.net@gmail.com"
echo ""
echo "📋 DNS配置说明："
echo "请将以下DNS记录添加到您的域名提供商："
echo "A记录: airoam.net -> $SERVER_IP"
echo "A记录: www.airoam.net -> $SERVER_IP"
echo ""
echo "📊 监控地址："
echo "- 网站: http://localhost"
echo "- 管理后台: http://localhost/admin"
echo "- API文档: http://localhost/api/"
echo ""
echo "🔧 服务管理："
echo "停止服务: ./stop_services.sh"
echo "查看日志: tail -f backend.log 或 tail -f frontend.log"
echo "重启Nginx: sudo nginx -s reload"
echo ""
echo "📝 注意事项："
echo "- 如果要从外部访问，请确保防火墙允许80端口"
echo "- 建议配置SSL证书以获得HTTPS支持"
echo "- 生产环境建议使用Gunicorn替代Django开发服务器" 