# 安装与依赖管理指引

本项目包含前端（Next.js）、后端（Django）、爬虫（Scrapy）三大部分，以下为详细安装与依赖管理说明。

---

## 一、前端（frontend）
- 技术栈：Next.js + TypeScript + Tailwind CSS + Font Awesome
- 依赖管理：npm

### 安装步骤
1. 进入项目根目录：
   ```bash
   cd "cursor test"
   ```
2. 进入前端目录并安装依赖：
   ```bash
   cd frontend
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```

---

## 二、后端（backend）
- 技术栈：Python 3 + Django + PostgreSQL + Django REST Framework
- 依赖管理：Python venv + pip

### 安装步骤
1. 进入项目根目录：
   ```bash
   cd "cursor test"
   ```
2. 激活虚拟环境（首次需先创建）：
   ```bash
   source backend_venv/bin/activate
   ```
3. 进入后端目录：
   ```bash
   cd backend
   ```
4. 安装依赖（如需）：
   ```bash
   pip install -r ../backend_venv/lib/python*/site-packages/requirements.txt
   ```
5. 启动开发服务器：
   ```bash
   python manage.py runserver
   ```

---

## 三、爬虫（crawler）
- 技术栈：Python 3 + Scrapy
- 依赖管理：同后端虚拟环境

### 安装步骤
1. 激活虚拟环境：
   ```bash
   source backend_venv/bin/activate
   ```
2. 进入爬虫目录：
   ```bash
   cd crawler
   ```
3. 运行爬虫示例：
   ```bash
   scrapy list
   # 或
   scrapy crawl example
   ```

---

## 其他说明
- 推荐使用 VSCode 或 PyCharm 进行开发。
- PostgreSQL 数据库需本地或云端安装，默认端口 5432。
- 如需安装 PostgreSQL，可参考官网：https://www.postgresql.org/download/
- 支付系统、会员系统、API 对接等功能请参考 README.md 详细开发说明。

如有问题，欢迎随时咨询！ 