# Update Data from E-Solat

JAKIM usually publish new prayer time for upcoming year around October/November/December. To update the prayer time data in our system, we fetch the data from [E-Solat](https://www.e-solat.gov.my/index.php?siteId=24&pageId=24) source and import it into our database.

The flow is two folds:

1. Fetch data from E-Solat

    We have a console command `php artisan app:fetch-waktu-solat-from-source {year}` which fetches the prayer time data from E-Solat source for all zones and for the specified year. The data is saved into CSV files in the `resources` directory.

2. Import data into Database

    After fetching the data, we use another console command `php artisan db:import-prayer-times {year}` to import the data from the CSV files into our database.

Example:

```bash
php artisan app:fetch-waktu-solat-from-source 2026
php artisan db:import-prayer-times 2026
```

Why two steps? This approach allows us to separate the data fetching and data importing processes. It also provides a way to review the fetched data before importing it into the database.