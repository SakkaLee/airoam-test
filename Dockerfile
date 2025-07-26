# 多阶段构建
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ ./
RUN npm run build

# Python后端
FROM python:3.11-slim

# 设置环境变量
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=airoam.settings

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 复制requirements文件
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 复制后端代码
COPY backend/ ./backend/

# 复制前端构建文件
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/

# 安装前端依赖
WORKDIR /app/frontend
RUN npm ci --only=production

# 复制爬虫代码
WORKDIR /app
COPY crawler/ ./crawler/

# 创建启动脚本
RUN echo '#!/bin/bash\n\
cd /app/backend\n\
python manage.py migrate\n\
python manage.py collectstatic --noinput\n\
cd /app/frontend\n\
npm start\n\
' > /app/start.sh && chmod +x /app/start.sh

# 暴露端口
EXPOSE 3000 8000

# 启动命令
CMD ["/app/start.sh"] 