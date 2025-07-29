# 项目部署与开发须知

## 后端环境要求
- 推荐 Python 版本：3.10 或 3.11（不建议使用 3.12）
- 强烈建议使用 pyenv 管理多版本 Python，确保本地与云端一致
- 安装依赖前请先激活虚拟环境，并用 `pip install -r backend/requirements.txt` 安装依赖
- requirements.txt 已锁定依赖版本，避免兼容性问题

## 环境变量管理
- Railway/Vercel 部署请在平台环境变量界面配置 API_TOKEN、SERVICE_ID 等敏感信息
- 本地开发可在 .env 文件中配置，或直接导出环境变量

## 自动化检测
- 推荐每次部署前运行 pre_deploy_check.sh 检查环境

---

## 一键部署与环境变量配置

### 前端（Vercel）
1. 绑定 GitHub 仓库，自动部署。
2. 在 Vercel 项目 Settings → Environment Variables 添加：
   - `NEXT_PUBLIC_API_BASE=https://9ncysfs0.up.railway.app`（或你的后端域名）
3. 推送代码后自动构建。

### 后端（Railway）
1. 绑定 GitHub 仓库，自动部署。
2. 在 Railway 项目 Variables 添加：
   - `SECRET_KEY`、`ALLOWED_HOSTS`、`PGDATABASE`、`PGUSER`、`PGPASSWORD`、`PGHOST`、`PGPORT`、`STRIPE_SECRET_KEY` 等。
3. 推送代码后自动构建。

### 域名绑定
- 前端：Vercel 控制台添加自定义域名，按提示配置 DNS。
- 后端：Railway 控制台添加自定义域名，按提示配置 DNS。

### 全链路测试
- 访问前端域名，注册/登录/新闻/订阅等功能全部测试。
- 检查浏览器控制台和网络请求，确保 API 能正常访问。 