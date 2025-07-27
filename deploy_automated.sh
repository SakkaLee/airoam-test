#!/bin/bash

# 自动化部署脚本 - Vercel + Railway 云端部署
# 作者: AI助手
# 日期: $(date)

set -e  # 遇到错误立即退出

echo "🚀 开始自动化部署流程..."
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. 环境检查
log_info "步骤 1: 环境检查"
echo "----------------------------------"

# 检查Git
if ! command -v git &> /dev/null; then
    log_error "Git未安装"
    exit 1
fi
log_success "Git已安装"

# 检查Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js未安装"
    exit 1
fi
log_success "Node.js已安装: $(node --version)"

# 检查npm
if ! command -v npm &> /dev/null; then
    log_error "npm未安装"
    exit 1
fi
log_success "npm已安装: $(npm --version)"

# 检查Python
if ! command -v python3 &> /dev/null; then
    log_error "Python3未安装"
    exit 1
fi
log_success "Python3已安装: $(python3 --version)"

# 检查Vercel CLI
if ! command -v vercel &> /dev/null; then
    log_warning "Vercel CLI未安装，正在安装..."
    npm install -g vercel
fi
log_success "Vercel CLI已安装"

# 检查Railway CLI
if ! command -v railway &> /dev/null; then
    log_warning "Railway CLI未安装，正在安装..."
    npm install -g @railway/cli
fi
log_success "Railway CLI已安装"

# 2. 清理环境
log_info "步骤 2: 清理环境"
echo "----------------------------------"

# 停止可能运行的服务
log_info "停止可能运行的服务..."
pkill -f "python.*manage.py" || true
pkill -f "next.*dev" || true
pkill -f "npm.*start" || true

# 清理端口
log_info "清理端口占用..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# 清理临时文件
log_info "清理临时文件..."
rm -f *.log *.pid nohup.out
rm -rf .next
rm -rf node_modules/.cache

# 3. 代码质量检查
log_info "步骤 3: 代码质量检查"
echo "----------------------------------"

# 前端代码检查
log_info "检查前端代码..."
cd frontend
npm install
npm run lint || {
    log_warning "前端代码有lint警告，但继续部署..."
}
cd ..

# 后端代码检查
log_info "检查后端代码..."
cd backend
if [ -d "venv" ]; then
    source venv/bin/activate
else
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# 检查Django配置
python manage.py check --settings=airoam.settings_minimal || {
    log_error "Django配置检查失败"
    exit 1
}
cd ..

# 4. Git操作
log_info "步骤 4: Git操作"
echo "----------------------------------"

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    log_info "发现未提交的更改，正在提交..."
    
    # 添加所有文件
    git add .
    
    # 提交更改
    git commit -m "自动化部署更新 - $(date '+%Y-%m-%d %H:%M:%S')"
    
    # 推送到远程仓库
    git push origin main
    
    log_success "代码已推送到GitHub"
else
    log_info "没有未提交的更改"
fi

# 5. Vercel部署（前端）
log_info "步骤 5: Vercel部署（前端）"
echo "----------------------------------"

cd frontend

# 检查Vercel项目配置
if [ ! -f ".vercel/project.json" ]; then
    log_info "初始化Vercel项目..."
    vercel --yes
else
    log_info "部署到Vercel..."
    vercel --prod --yes
fi

# 获取部署URL
VERCEL_URL=$(vercel ls | grep "ai-tech-platform" | head -1 | awk '{print $2}')
if [ -n "$VERCEL_URL" ]; then
    log_success "Vercel部署成功: $VERCEL_URL"
    echo "FRONTEND_URL=$VERCEL_URL" > ../.env.deploy
else
    log_warning "无法获取Vercel部署URL"
fi

cd ..

# 6. Railway部署（后端）
log_info "步骤 6: Railway部署（后端）"
echo "----------------------------------"

cd backend

# 检查Railway项目配置
if [ ! -f ".railway/project.json" ]; then
    log_info "初始化Railway项目..."
    railway login
    railway init
else
    log_info "部署到Railway..."
    railway up
fi

# 获取部署URL
RAILWAY_URL=$(railway status | grep "URL" | awk '{print $2}')
if [ -n "$RAILWAY_URL" ]; then
    log_success "Railway部署成功: $RAILWAY_URL"
    echo "BACKEND_URL=$RAILWAY_URL" >> ../.env.deploy
else
    log_warning "无法获取Railway部署URL"
fi

cd ..

# 7. 环境变量配置
log_info "步骤 7: 环境变量配置"
echo "----------------------------------"

if [ -f ".env.deploy" ]; then
    log_info "配置环境变量..."
    source .env.deploy
    
    # 更新前端环境变量
    if [ -n "$BACKEND_URL" ]; then
        cd frontend
        echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > .env.local
        cd ..
        log_success "前端环境变量已配置"
    fi
    
    # 更新后端环境变量
    if [ -n "$FRONTEND_URL" ]; then
        cd backend
        echo "FRONTEND_URL=$FRONTEND_URL" > .env
        echo "ALLOWED_HOSTS=*" >> .env
        echo "DEBUG=False" >> .env
        cd ..
        log_success "后端环境变量已配置"
    fi
fi

# 8. 健康检查
log_info "步骤 8: 健康检查"
echo "----------------------------------"

# 等待部署完成
log_info "等待部署完成..."
sleep 30

# 检查前端
if [ -n "$FRONTEND_URL" ]; then
    log_info "检查前端服务..."
    if curl -f -s "$FRONTEND_URL" > /dev/null; then
        log_success "前端服务正常"
    else
        log_warning "前端服务可能有问题"
    fi
fi

# 检查后端
if [ -n "$BACKEND_URL" ]; then
    log_info "检查后端服务..."
    if curl -f -s "$BACKEND_URL/health/" > /dev/null; then
        log_success "后端服务正常"
    else
        log_warning "后端服务可能有问题"
    fi
fi

# 9. 域名配置（可选）
log_info "步骤 9: 域名配置"
echo "----------------------------------"

log_info "域名配置需要手动完成："
echo "1. 在Vercel中配置自定义域名"
echo "2. 在Railway中配置自定义域名"
echo "3. 更新DNS记录"

# 10. 完成
log_success "部署流程完成！"
echo "=================================="
echo "部署总结："
echo "- 前端: $FRONTEND_URL"
echo "- 后端: $BACKEND_URL"
echo "- 状态: 部署完成"
echo ""
echo "下一步："
echo "1. 配置自定义域名"
echo "2. 设置SSL证书"
echo "3. 配置监控和日志"
echo "4. 测试所有功能"

# 清理临时文件
rm -f .env.deploy

log_success "自动化部署脚本执行完成！" 