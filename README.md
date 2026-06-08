# Apollo# Apollo

## Requirements (check which versions we have)
- PHP 8.2+
- Composer
- Node.js 18+
- PostgreSQL
## preconfig
php.ini uncomment 
    extension=fileinfo
    extension=pdo_pgsql
    extension=pgsql

cd backend
composer install

configure .env
    DB_CONNECTION=pgsql
# fill in your DB credentials in .env (example)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=postgres
DB_PASSWORD=123

php artisan key:generate
php artisan migrate
php artisan serve
