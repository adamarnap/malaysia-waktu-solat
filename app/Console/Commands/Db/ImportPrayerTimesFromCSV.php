<?php

namespace App\Console\Commands\Db;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class ImportPrayerTimesFromCSV extends Command
{
    protected $signature = 'db:import-prayer-times {year} {--truncate : Truncate existing data for the year before importing}';

    protected $description = 'Import prayer times from CSV file into database';

    public function handle()
    {
        $year = $this->argument('year');
        $csvPath = resource_path("csv/Dump-output-{$year}.csv");

        if (!file_exists($csvPath)) {
            $this->error("CSV file not found: {$csvPath}");
            return Command::FAILURE;
        }

        $this->info("Importing prayer times from: {$csvPath}");

        if ($this->option('truncate')) {
            if ($this->confirm("This will delete all prayer times for year {$year}. Continue?")) {
                DB::table('prayer_times')
                    ->whereYear('date', $year)
                    ->delete();
                $this->info("Existing data for {$year} has been deleted.");
            } else {
                $this->info("Import cancelled.");
                return Command::FAILURE;
            }
        }

        try {
            // Create a CSV Reader instance
            $csv = Reader::from($csvPath, 'r');
            $csv->setHeaderOffset(0);

            $records = iterator_to_array($csv->getRecords());
            $totalRecords = count($records);
            
            $this->info("Found {$totalRecords} records to import.");

            $progressBar = $this->output->createProgressBar($totalRecords);
            $progressBar->start();

            $batchSize = 1000;
            $batch = [];
            $count = 0;
            $now = now()->format('Y-m-d H:i:s');

            DB::beginTransaction();

            foreach ($records as $record) {
                $date = Carbon::createFromTimestamp((int) $record['fajar'], 'Asia/Kuala_Lumpur')->toDateString();

                $batch[] = [
                    'date' => $date,
                    'location_code' => $record['zone'],
                    'hijri' => $record['tarikh_hijri'],
                    'fajr' => $this->timestampToTimeString($record['fajar']),
                    'syuruk' => $this->timestampToTimeString($record['syuruk']),
                    'dhuhr' => $this->timestampToTimeString($record['zohor']),
                    'asr' => $this->timestampToTimeString($record['asar']),
                    'maghrib' => $this->timestampToTimeString($record['maghrib']),
                    'isha' => $this->timestampToTimeString($record['isyak']),
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                $count++;
                $progressBar->advance();

                if (count($batch) >= $batchSize) {
                    DB::table('prayer_times')->insertOrIgnore($batch);
                    $batch = [];
                }
            }

            // Insert remaining records
            if (!empty($batch)) {
                DB::table('prayer_times')->insertOrIgnore($batch);
            }

            DB::commit();
            $progressBar->finish();
            $this->newLine(2);
            $this->info("✓ Successfully imported {$count} prayer time records for year {$year}.");

            return Command::SUCCESS;

        } catch (\Exception $e) {
            DB::rollBack();
            $this->newLine();
            $this->error('Error importing prayer times: ' . $e->getMessage());
            $this->error('Line: ' . $e->getLine());
            
            return Command::FAILURE;
        }
    }

    private function timestampToTimeString($timestamp): ?string
    {
        if (empty($timestamp)) {
            return null;
        }

        return Carbon::createFromTimestamp((int) $timestamp, 'Asia/Kuala_Lumpur')->format('H:i:s');
    }
}
