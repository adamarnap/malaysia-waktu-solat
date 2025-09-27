###############################################
# Production Dockerfile for Laravel 12 on Coolify
# - PHP 8.3 FPM
# - Multi-stage: build (composer + node) -> runtime
# - No MySQL, no Nginx (Coolify uses Traefik)
# - Serves app with: php artisan serve --host=0.0.0.0 --port=8000
###############################################

# ---------- Base image (with build toolchain) ----------
FROM php:8.3-fpm-bookworm AS base

ARG DEBIAN_FRONTEND=noninteractive

# Install system dependencies & libraries for PHP extensions
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git curl unzip ca-certificates gnupg \
    libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions (intl, zip, gd, pcntl, pdo_mysql)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) intl zip gd pcntl pdo_mysql opcache

# Enable production recommended OPcache settings
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

# Install Composer
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer --version

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# ---------- Dependencies & asset builder ----------
FROM base AS build-deps

COPY composer.json composer.lock ./

RUN composer install --no-dev --prefer-dist --no-progress --no-interaction --optimize-autoloader

# Copy package manifests & install node deps (using ci if lock exists)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

COPY . .

RUN npm run build

# ---------- Production runtime image ----------
FROM php:8.3-fpm-bookworm AS runtime

ARG DEBIAN_FRONTEND=noninteractive

# Install only the runtime libraries needed (matching extensions compiled previously)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libicu72 libzip4 libpng16-16 libjpeg62-turbo libfreetype6 \
    ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

# Copy PHP extension configuration & opcache settings from build stage
COPY --from=base /usr/local/etc/php/conf.d/opcache-recommended.ini /usr/local/etc/php/conf.d/opcache-recommended.ini

WORKDIR /var/www/html

# Copy vendor (composer prod deps) & app code (selective)
COPY --from=build-deps /var/www/html/vendor ./vendor
COPY --from=build-deps /var/www/html/public/build ./public/build
# If manifest.json exists (Vite), copy it; ignore if absent
RUN if [ -f /var/www/html/public/build/manifest.json ]; then cp /var/www/html/public/build/manifest.json /var/www/html/public/manifest.json; fi || true

COPY . .

# Ensure storage & cache directories are writable
RUN chown -R www-data:www-data storage bootstrap/cache \
    && find storage -type d -exec chmod 775 {} \; \
    && chmod -R 775 bootstrap/cache

EXPOSE 8000

# Environment defaults (overridden by Coolify)
ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    PORT=8000

# Healthcheck (lightweight) - adjust path if you add a dedicated health route
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD php -r 'exit((@fsockopen("127.0.0.1", getenv("PORT")))?0:1);'

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
