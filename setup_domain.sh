#!/bin/bash

echo "🌐 Airoam域名配置脚本"
echo "========================"

# 获取服务器IP
echo "📡 获取服务器IP地址..."
SERVER_IP=$(curl -s ifconfig.me)
echo "服务器IP: $SERVER_IP"

# 检查Nginx
if command -v nginx &> /dev/null; then
    echo "✅ Nginx已安装"
    
    # 创建Nginx配置
    echo "🔧 创建Nginx配置..."
    sudo mkdir -p /opt/homebrew/etc/nginx/servers
    sudo tee /opt/homebrew/etc/nginx/servers/airoam.net.conf <<EOF
    server {
        listen 80;
        server_name airoam.net www.airoam.net;
        
        location / {
            proxy_pass http://localhost:3000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
        
        location /api/ {
            proxy_pass http://localhost:8000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
    EOF
    brew services restart nginx
    
    echo "✅ Nginx配置完成"
else
    echo "⚠️ Nginx未安装，使用内置服务器"
fi

# 检查SSL证书
if command -v certbot &> /dev/null; then
    echo "🔒 配置SSL证书..."
    sudo certbot --nginx -d airoam.net -d www.airoam.net --non-interactive --agree-tos --email airoam.net@gmail.com
    echo "✅ SSL证书配置完成"
else
    echo "⚠️ Certbot未安装，请手动配置SSL证书"
fi

echo ""
echo "🎉 域名配置完成！"
echo "🌐 网站地址: http://airoam.net"
echo "🔒 HTTPS地址: https://airoam.net"
echo "📧 联系邮箱: airoam.net@gmail.com"
echo ""
echo "📋 DNS配置说明："
echo "请将以下DNS记录添加到您的域名提供商："
echo "A记录: airoam.net -> $SERVER_IP"
echo "A记录: www.airoam.net -> $SERVER_IP"
echo ""
echo "📊 监控地址:"
echo "- 网站: https://airoam.net"
echo "- 管理后台: https://airoam.net/admin"
echo "- API文档: https://airoam.net/api/" 

# 后端
cd backend
source ../backend_venv/bin/activate
nohup python manage.py runserver 0.0.0.0:8000 > ../backend.log 2>&1 &

# 前端
cd ../frontend
nohup npm start -- -H 0.0.0.0 > ../frontend.log 2>&1 & 