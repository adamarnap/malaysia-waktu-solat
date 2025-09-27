###############################################
# Production Dockerfile for Laravel 12 on Coolify
# Location: .docker/production/Dockerfile
# - PHP 8.3 FPM
# - Multi-stage: build (composer + node) -> runtime
# - No MySQL, no Nginx (Coolify uses Traefik)
# - Serves app with: php artisan serve --host=0.0.0.0 --port=8000
###############################################

# ---------- Base image (with build toolchain) ----------
FROM php:8.3-fpm-bookworm AS base

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git curl unzip ca-certificates gnupg \
    libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) intl zip gd pcntl pdo_mysql opcache

# (Optional) Redis extension (Predis doesn't require it)
# RUN pecl install redis && docker-php-ext-enable redis

RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.enable_cli=1'; \
    echo 'opcache.jit_buffer_size=64M'; \
    echo 'opcache.jit=tracing'; \
    echo 'opcache.memory_consumption=256'; \
    echo 'opcache.interned_strings_buffer=32'; \
    echo 'opcache.max_accelerated_files=20000'; \
    echo 'opcache.validate_timestamps=0'; \
    } > /usr/local/etc/php/conf.d/opcache-recommended.ini

ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer --version

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# ---------- Dependencies & asset builder ----------
FROM base AS build-deps

# Copy dependency files first for better Docker layer caching
COPY composer.json composer.lock ./
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* ./

# Install PHP dependencies without running post-autoload scripts
RUN composer install --no-dev --prefer-dist --no-progress --no-interaction --optimize-autoloader --no-scripts

# Install Node dependencies
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

# Copy application files
COPY . .

# Remove any existing cache files that might contain dev dependency references
RUN rm -f bootstrap/cache/packages.php bootstrap/cache/services.php bootstrap/cache/config.php

# Run composer post-autoload scripts now that artisan is available
RUN composer run-script post-autoload-dump

# Clear any cached service providers and configs that might reference dev dependencies
RUN php artisan clear-compiled || true
RUN php artisan package:discover --ansi

# Build assets
RUN npm run build
RUN rm -rf node_modules

# ---------- Production runtime image ----------
FROM php:8.3-fpm-bookworm AS runtime

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libicu72 libzip4 libpng16-16 libjpeg62-turbo libfreetype6 \
    libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev pkg-config \
    ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions needed for Laravel
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) intl zip gd pcntl pdo_mysql opcache

# Copy opcache configuration from base stage
COPY --from=base /usr/local/etc/php/conf.d/opcache-recommended.ini /usr/local/etc/php/conf.d/opcache-recommended.ini

WORKDIR /var/www/html

COPY --from=build-deps /var/www/html/vendor ./vendor
COPY --from=build-deps /var/www/html/public/build ./public/build
RUN if [ -f /var/www/html/public/build/manifest.json ]; then cp /var/www/html/public/build/manifest.json /var/www/html/public/manifest.json; fi || true

COPY . .

RUN chown -R www-data:www-data storage bootstrap/cache \
    && find storage -type d -exec chmod 775 {} \; \
    && chmod -R 775 bootstrap/cache

EXPOSE 8000

ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    PORT=8000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD php -r 'exit((@fsockopen("127.0.0.1", getenv("PORT")))?0:1);'

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]