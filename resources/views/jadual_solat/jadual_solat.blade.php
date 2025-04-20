<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Jadual Waktu Solat</title>

    <style>
        .header-container {
            display: table;
            width: 100%;
            table-layout: fixed;
        }

        .title {
            display: table-cell;
            text-align: left;
            vertical-align: middle;
        }

        .month-year {
            display: table-cell;
            text-align: right;
            vertical-align: middle;
        }

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
            font-family: Arial, Helvetica, sans-serif;
            font-optical-sizing: auto;
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
    <div class="header-container">
        <h2 class="title">{{ $title }}</h2>
        <h2 class="month-year">{{ $monthName }} {{ $year }}</h2>
    </div>
    <div style="font-style: italic; padding: 6px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        <span style="background-color: yellow; padding: 2px 4px; border-radius: 2px;">
            {{ $zoneDetails->jakim_code }}
        </span>{{ $zoneDetails->daerah }}
    </div>

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
    <table style="width: 100%; border: none; padding-top: 5.3px;">
        <tr style="border: none;">
            <td style="text-align: left; border: none; padding: 0;">
                <span style="color: #555; font-size: 12px;">Dijana pada {{ now()->format('d/m/Y H:i:s') }}
                </span>
            </td>
            <td style="text-align: right; border: none; padding: 0;">
                <a href="https://waktusolat.app"
                    style="text-decoration: none; color: #555; font-size: 12px; display: inline-block;">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANiSURBVHgBvVe9bhNBEP527UgJKCJ0dBxPgHmCGBAKVISSKuYF4rvGcYRQ7AKS0Jz9BDhPQNIRCYRdQZeko+NKSqcJ4ce3zOydMefb27tEMp8U7+Z2dmZ2ZnZmVqAotvwlzKMCiMcQPMKhcQlKtNCsd3FJlHMpIsEupKhDkcAxBAk+C7tou8ME/bbvoER0De8Yu901bNT3bOyFbRG7vkskWwnBQAApa2isD1L0LBziLebVXfwUH2lfhRSt2ZQwW4BPvUCMFKpTKwEUMW+sB8Z9Uq7R+hCeN8Trbo/mFfwOT2BBCaZTzIlPNKukBZDwpvclixnurwjtmnsrpyT8gLifYJNcYYFMCRdkOg6waTDjhp0ZCevTb5/ixSf6r/iFXCRjYKfDwqsGugBN9xZsYLddEW/IbauJfeyyTS/I2jaxwLbfyhAend4GttyCOJoSznBo8xFe+hW7ApHp17KIEIYD2CDoppjcptfoBklyq74hWQrYGRzbTEiMq/Rbg1VBvsaURzIVyDI9IyQ/2iApMxZDzbidkg37zUG2AHvkK1RQBGwFDtSUAhDL+F9YnLs2/amce4JQLVnXldrTVgr1f05kMbWqixRUh9bb2v9S7Ju2l3VlUxYBAnYFJIak5DjdntCcR6qO6jqN7VjLrv5+Fp6mFVA5AmwBqnnT6UQOzRiLZU50ieopC2xz4qs2E0jSfphPJWcWqJJckK9AqFzTFcpAT/cAAp0ih+MYOCZCx0rFgbhAFQ54hjzhTXdMs0euO4irayYkSqKPYqjhFXdIFoxUsjfk8sypPAtUACVG4QGKgus893lZeG7oF7JczNVXiJsyLjR9FIVSvbh0Xw4cS9t+TxdAKXvlmGmbPlQLM+HNO51l2pcXE0mMRlWKpRai2hNwYxvlgXErdTFUddslChYjBlvvb+ETOp4mLRk3DFJ3NUWvmwlB/AfNR5IwEz9FV3TT9Xg66Yo/HA6pm/1Bp3qIy4OFOYheTTdonIdJyXP1FIPD86QCkRKf8eARz6qYDaIm9YX3bfwh/S54/24wIyWMHbK5GG3U6VaoJ0BOO1YU7PPv6o6pt7S/DaPA5EepPQNmgx4psmV8RxZS4F9F2CWRMvZrxwVIYZ+TjE3whPyi4Ex2tXSb7FpJvZoFPUTznm9T+AM5WCC2hyMHXgAAAABJRU5ErkJggg=="
                        alt="Logo"
                        style="height: 14px; width: auto; vertical-align: middle; margin-right: 4px; display: inline-block;">
                    <span style="vertical-align: middle; display: inline-block; font-weight: 700;">Waktu
                        Solat
                        Malaysia</span>
                </a>
            </td>
        </tr>
    </table>
</body>

</html>
