# Cara Penggunaan
Untuk menggunakan pustaka ```HttpClient``` anda menggunakan sintak sebagai berikut:
#### Permintaan dengan metoda ```GET```
Jika anda hendak mengambil sumber data dari layanan luar maka anda perlu menggunakan metoda ```GET```.
```php
<?php
use SLiMS\Http\Client;

$request = Client::get('https://slims.web.id/kutipan/');
```
#### Permintaan dengan metoda ```POST```
Jika anda hendak mengirim data ke sumber lain maka anda perlu menggunakan metoda ```POST```.
```php
$request = Client::post('https://slims.web.id/kutipan/');
```
Berikut metoda yang dapat digunakan pada pustaka ```SLiMS\Http\Client```:
1. get,
2. head,
3. post,
4. put,
5. delete,
6. options,
7. patch

#### Menambahkan opsi
opsi disini merupakan opsi yang digunakan oleh pustaka ```guzzlehttp/guzzle```.
```php
$request = Client::withOption('allow_redirects', true)->get('https://slims.web.id/kutipan/');
```
#### Menambahkan banyak opsi
```php
$request = Client::withOption([
    'max' => 5,
    'strict' => false,
    'referer' => false,
    'protocols' => ['http', 'https'],
    'track_redirects' => false
])->get('https://slims.web.id/kutipan/');
```

#### Menambahkan *headers*
```headers``` merupakan opsi yang dikenali oleh pustaka ```guzzlehttp/guzzle``` sebagai data http header yang akan diikut sertakan dalam proses permintaan http atau *Http Request* kepada layanan yang dituju. Namun anda dapat menulis headers tanpa perlu menulis dalam format ```withOption```, cukup dengan sintak sebagai berikut:
```php
$request = Client::withHeaders([
    'Content-Type' => 'application/json',
    'X-Authentication' => 'jka;sdljfaksjdflkoiopi'
])->get('https://slims.web.id/kutipan/');
```

#### Menambahkan *body*
```body``` merupakan opsi yang dikenali oleh pustaka ```guzzlehttp/guzzle``` sebagai data http body yang akan dibaca sebagai ```$_POST``` pada layanan yang dituju. Cara penulisnya tak berbeda jauh dengan ```withHeaders```:
```php
// Mengirim body sebagai teks
$request = Client::withBody(json_encode([
    'age' => 20
]))->post('https://slims.web.id/kutipan/');

// atau dalam bentuk form
$request = Client::post('https://slims.web.id/kutipan/', [
    'Age' => 20
]);
```

#### Menggabungkan *options*, *headers* dan *body*
```php
// Mengirim body sebagai teks
$request = Client::withOption('max', 20)
                    ->withHeaders([
                        'Content-Type' => 'application/json',
                        'X-Authentication' => 'jka;sdljfaksjdflkoiopi'
                    ])->withBody(json_encode([
                        'age' => 20
                    ]))->post('https://slims.web.id/kutipan/');
```