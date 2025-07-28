# Airoam - AI News Aggregator

## Project Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to preview.

## Deployment (Vercel)
1. Push your code to GitHub.
2. Go to https://vercel.com, import your repo, and follow the instructions.
3. Set your custom domain (e.g., airoam.net) in Vercel dashboard.

## Features
- English UI, brand name "Airoam" everywhere
- Custom logo, modern tech style, responsive layout
- Contact email: Airoam@gmail.com
- Ready for further AI news/data integration
# Test commit

## 环境变量与部署说明

- 在 Vercel 或本地开发时，需设置环境变量：
  - `NEXT_PUBLIC_API_BASE=https://9ncysfs0.up.railway.app`（或你的后端域名）
- 参考 `.env.example` 文件。
- 推送代码后，Vercel 会自动构建并部署。
