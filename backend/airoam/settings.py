INSTALLED_APPS += [
    'rest_framework',
    'corsheaders',
]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
] + MIDDLEWARE
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://airoam.net",
] 