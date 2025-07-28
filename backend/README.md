# Airoam Backend (Django)

## Setup (Development & Production)

### 1. Install dependencies
```bash
python3 -m venv backend_venv
source backend_venv/bin/activate
pip install -r backend/requirements.txt
```

### 2. Database setup (PostgreSQL)
- Install PostgreSQL (https://www.postgresql.org/download/)
- Create a database and user, e.g.:
  ```sql
  CREATE DATABASE airoam_db;
  CREATE USER airoam_user WITH PASSWORD 'yourpassword';
  GRANT ALL PRIVILEGES ON DATABASE airoam_db TO airoam_user;
  ```
- Edit `backend/airoam/settings.py`:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'airoam_db',
          'USER': 'airoam_user',
          'PASSWORD': 'yourpassword',
          'HOST': 'localhost',
          'PORT': '5432',
      }
  }
  ```

### 3. Migrate & run
```bash
cd backend
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### 4. API Example
- Visit: http://localhost:8000/api/news/

### 5. Production deployment
- Use gunicorn/uvicorn + nginx for production
- Set `DEBUG = False` and configure `ALLOWED_HOSTS` in `settings.py`
- Use environment variables for secrets

---

## API Structure
- `/api/news/` : Get AI news (demo)
- Ready for further endpoints (user, comments, etc.) 

## 部署与环境变量说明

- Railway 部署需配置以下环境变量：
  - `SECRET_KEY`、`ALLOWED_HOSTS`、`PGDATABASE`、`PGUSER`、`PGPASSWORD`、`PGHOST`、`PGPORT`、`STRIPE_SECRET_KEY` 等。
- 推送代码到 GitHub 后，Railway 会自动构建并部署。
- 生产环境建议使用 `settings_prod.py`。 