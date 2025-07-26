# Vercel + Railway 部署指南

## 架构说明
- **前端（Next.js）**: 部署在 Vercel
- **后端（Django）**: 部署在 Railway
- **域名分发**:
  - `airoam.net` 和 `www.airoam.net` → Vercel
  - `api.airoam.net` → Railway

## 第一步：Vercel 前端部署

### 1. 推送代码到 GitHub
```bash
cd frontend
git add .
git commit -m "Update API endpoints for Vercel deployment"
git push origin main
```

### 2. 在 Vercel 后台设置环境变量
- 登录 Vercel 后台
- 进入项目设置 → Environment Variables
- 添加变量：
  ```
  NEXT_PUBLIC_API_BASE=https://api.airoam.net
  ```

### 3. 绑定自定义域名
- 在 Vercel 后台 → Domains
- 添加 `airoam.net` 和 `www.airoam.net`
- 按照提示更新 DNS 记录

## 第二步：Railway 后端部署

### 1. 推送后端代码到 GitHub
```bash
cd backend
git add .
git commit -m "Update Django settings for Railway deployment"
git push origin main
```

### 2. 在 Railway 后台设置环境变量
- 登录 Railway 后台
- 进入项目设置 → Variables
- 添加必要的环境变量（如数据库连接、Stripe密钥等）

### 3. 绑定自定义域名
- 在 Railway 后台 → Domains
- 添加 `api.airoam.net`
- Railway 会提供 CNAME 地址，更新到 DNS

## 第三步：DNS 配置（GoDaddy）

### 当前 DNS 记录（已配置正确）
| 主机记录 | 记录类型 | 值（目标）                  |
|----------|----------|-----------------------------|
| @        | A        | 76.76.21.21                 |
| www      | CNAME    | cname.vercel-dns.com        |
| api      | CNAME    | 9ncysfs0.up.railway.app     |

## 第四步：验证部署

### 1. 测试前端访问
- 访问 https://airoam.net
- 访问 https://www.airoam.net
- 确认页面正常加载

### 2. 测试 API 访问
- 访问 https://api.airoam.net/api/news/
- 确认返回 JSON 数据

### 3. 测试前端 API 调用
- 在网站首页查看新闻是否正常加载
- 测试订阅功能是否正常

## 环境变量说明

### 本地开发
```bash
# frontend/.env.local
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### Vercel 生产环境
```bash
# Vercel Environment Variables
NEXT_PUBLIC_API_BASE=https://api.airoam.net
```

## 注意事项

1. **API 地址已更新**：所有前端 API 请求现在使用环境变量
2. **本地开发**：仍可使用 localhost:8000
3. **生产环境**：自动使用 https://api.airoam.net
4. **CORS 配置**：确保 Railway 后端允许来自 Vercel 域名的请求

## 故障排除

### 如果 API 请求失败
1. 检查 Railway 后端是否正常运行
2. 确认 DNS 解析是否正确
3. 检查 CORS 配置
4. 验证环境变量设置

### 如果前端无法访问
1. 检查 Vercel 部署状态
2. 确认域名绑定是否正确
3. 检查环境变量设置

## 自动化部署

- **Vercel**: 推送代码到 GitHub 主分支自动部署
- **Railway**: 推送代码到 GitHub 主分支自动部署
- **DNS**: 配置完成后自动生效

---

**完成以上步骤后，你的网站将完全运行在 Vercel + Railway 的云托管架构上！** 