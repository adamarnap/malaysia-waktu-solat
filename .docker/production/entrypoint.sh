#!/bin/sh
set -e

# Clear config, routes, views
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate Scribe API docs
php artisan scribe:generate

# optimize
php artisan optimize

exec "$@"