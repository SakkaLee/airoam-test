# 🚀 Airoam AI Tech Platform 部署指南

## 📋 部署状态

✅ **代码已准备就绪**
- 所有页面已完成开发
- 生产构建成功
- 代码已推送到GitHub仓库

## 🌐 部署到 airoam.net

### 方法一：使用 Vercel（推荐）

1. **访问 [Vercel](https://vercel.com)**
   - 使用GitHub账号登录
   - 点击 "New Project"

2. **导入GitHub仓库**
   - 选择 `SakkaLee/airoam-test` 仓库
   - 选择 `main` 分支
   - 框架预设选择 "Next.js"

3. **配置项目**
   - 项目名称：`airoam`
   - 根目录：`frontend`
   - 构建命令：`npm run build`
   - 输出目录：`.next`

4. **设置环境变量**
   ```
   NEXT_PUBLIC_SITE_URL=https://www.airoam.net
   ```

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成

6. **配置自定义域名**
   - 在项目设置中添加域名：`airoam.net`
   - 添加 `www.airoam.net`
   - 配置DNS记录指向Vercel

### 方法二：使用 Netlify

1. **访问 [Netlify](https://netlify.com)**
2. **导入GitHub仓库**
3. **配置构建设置**
   - 构建命令：`cd frontend && npm run build`
   - 发布目录：`frontend/.next`

### 方法三：使用传统服务器

1. **服务器要求**
   - Node.js 18+
   - Nginx
   - SSL证书

2. **部署步骤**
   ```bash
   # 克隆代码
   git clone https://github.com/SakkaLee/airoam-test.git
   cd airoam-test/frontend
   
   # 安装依赖
   npm install
   
   # 构建
   npm run build
   
   # 启动
   npm start
   ```

## 🔧 域名配置

### DNS设置
```
Type: A
Name: @
Value: [Vercel/Netlify IP]

Type: CNAME
Name: www
Value: [your-domain.vercel.app]
```

### SSL证书
- Vercel/Netlify 自动提供SSL
- 传统服务器需要配置Let's Encrypt

## 📊 监控和维护

### 性能监控
- 使用Vercel Analytics
- 配置错误监控
- 设置性能警报

### 内容更新
- 推送代码到GitHub自动触发部署
- 使用Vercel CLI进行本地测试

## 🆘 故障排除

### 常见问题
1. **构建失败**
   - 检查Node.js版本
   - 清理node_modules重新安装

2. **域名无法访问**
   - 检查DNS配置
   - 确认SSL证书状态

3. **页面404错误**
   - 检查Next.js路由配置
   - 确认文件路径正确

## 📞 技术支持

- **邮箱**: airoam.net@gmail.com
- **GitHub**: https://github.com/SakkaLee/airoam-test
- **文档**: 查看项目README.md

---

**部署完成后，您的AI科技平台将在 https://www.airoam.net 上线！** 🎉 