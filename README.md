![Laravel](https://img.shields.io/badge/laravel-12-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)

<img width="1920" height="540" alt="GitHub API Server Readme Banner" src="https://github.com/user-attachments/assets/4605bb5f-d8b7-41be-8552-b6bb773eb086" />

# Waktu Solat API / Prayer Time API

This service provides prayer times data for all states in Malaysia. Data is based on JAKIM.

*Disclaimer:* This service is **not affiliated** with JAKIM nor endorsed by them in any way.

## Getting Started

### Bare Metal

To get started, clone the repository. Then, install Composer & Node dependencies:

```bash
composer install
npm install
```

Set up your `.env` file:

```bash
cp .env.example .env
```

In the `.env` file, fill in the database connection info. To get started quickly, you can use SQLite:

```env
DB_CONNECTION=sqlite
```

Then, run the migrations & seeder:

```bash
php artisan migrate --seed
```

Generate the api documentation page:

```bash
php artisan scribe:generate
```

Build and start the application:

```bash
composer run dev
```

> [!NOTE]
> When running `composer run dev`, it will automatically listen for changes in the `app/Http/Controllers/api/**/*.php` files and regenerate the API documentation. However, sometimes it may not work. In such cases, try running the following command separately in another terminal:
>
> ```bash
> npx chokidar 'app/Http/Controllers/api/**/*.php' -c 'php artisan scribe:generate'
> ```

And start the node server (This is a helper server to process geojson data):

```bash
node node-api/geojson-helper/server.js
```

You can now access the application at `http://localhost:8000`. The api docs will be available at `http://localhost:8000/docs`.

### Docker

> [!WARNING]
> Docker support for development is not fully optimized yet. Sometimes it works and sometimes it doesn't. If you encounter any issues, please open an issue on the GitHub repository. Also, I'm aware about [Laravel Sail](https://laravel.com/docs/12.x/sail), tried it and too many things didn't work. Submit patches please.

For the first time, run the following commands:

- Clone and navigate into the project.
- `docker compose up -d --build`
- `docker compose exec php bash`
- `composer setup`

From the second time onwards

- `docker compose up -d`

## Troubleshooting

When error "Failed to Fetch" appear in the Swagger UI. Update the `APP_URL` value in the `.env` file to match the app URL. Example:

```dotenv
APP_URL=http://127.0.0.1:8000
```
## Architecture

TODO

## Motivation

In early days of App Waktu Solat API, I rely on API server provided by others. But sometimes, the server got shut down, discontinued, out of date etc. Hence, I think I need to maintain my own server.

History of API Server implementation, sorted from latest to oldest:
1. This API
2. [MPT Server](https://github.com/mptwaktusolat/api-waktusolat) - _Discontinued_
3. [MPT Backup API](https://github.com/mptwaktusolat/mpt-backup-api) - _Discontinued_

Wonder why so many changes? [Here's why](https://example.com). (TODO)

## Deployments

See [deployments.md](docs/deployment.md) for deployment details.
