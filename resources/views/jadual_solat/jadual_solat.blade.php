<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Jadual Waktu Solat</title>

    <style>
        table,
        th,
        td {
            table-layout: fixed;
            font-family: Arial, Helvetica, sans-serif;
            width: 100%;
            text-align: center;
            font-size: 14px;
            border: 1px solid #333;
            border-collapse: collapse;
        }

        thead.table-dark th {
            background-color: #222;
            color: #fff;
        }

        tbody tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tbody tr:nth-child(odd) {
            background-color: #fff;
        }

        @page {
            margin: 10px 10px 10px 10px !important;
        }

        body {
            margin: 10px 10px 10px 10px !important;
        }
    </style>

    @if ($orientation == 'landscape')
        <style>
            th,
            td {
                padding: 1.4px;
            }
        </style>
    @else
        <style>
            th,
            td {
                padding: 5.8px;
            }
        </style>
    @endif
</head>

<body class="m-4">
    @php
        use Carbon\Carbon;
        $monthName = Carbon::create()->month(intval($month))->locale('ms')->translatedFormat('F');
    @endphp
    <h2>{{ $title }} : {{ $zone }} ({{ $monthName }}, {{ $year }})</h2>

    <table class="table table-bordered table-sm">
        <thead class="table-dark">
            <tr>
                <th>Tarikh</th>
                <th>Subuh</th>
                <th>Syuruk</th>
                <th>Zohor</th>
                <th>Asar</th>
                <th>Maghrib</th>
                <th>Isyak</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($prayerTimes as $prayerTime)
                <tr>
                    <td>{{ $prayerTime['date'] }}</td>
                    <td>{{ $prayerTime['fajr'] }}</td>
                    <td>{{ $prayerTime['syuruk'] }}</td>
                    <td>{{ $prayerTime['dhuhr'] }}</td>
                    <td>{{ $prayerTime['asr'] }}</td>
                    <td>{{ $prayerTime['maghrib'] }}</td>
                    <td>{{ $prayerTime['isha'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    {{-- Don't add break if orientation is landscape because we want to make the page as compact as possible. --}}
    @if ($orientation != 'landscape')
        <br>
    @endif
    <footer>
        <small style="color: #888;">Dijana pada {{ now()->format('d/m/Y H:i:s') }}</small>
    </footer>
</body>

</html>
