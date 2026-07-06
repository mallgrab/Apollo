# Apollo

## Requirements
- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL

## Backend Configuration
php -> php.ini uncomment 
* extension=fileinfo
* extension=pdo_pgsql
* extension=pgsql

```
cd backend
cp .env.example .env
```

configure .env, fill in your DB credentials in .env (example)
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=postgres
DB_PASSWORD=123
```

```
composer install
php artisan key:generate
php artisan migrate
```

## Frontend Configuration
```
cd frontend
npm install
```

## Start backend
```
php artisan serve
```
## Start frontend
```
npm run dev
```
