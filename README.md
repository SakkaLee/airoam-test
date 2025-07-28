
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