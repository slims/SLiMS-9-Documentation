---
title: Helpers
description: Contoh kita akan membuat provider terkait Cache yang disimpan pada...
image: https://static.slims.web.id/docs/helpers.png
---
SLiMS hadir dengan berbagai macam fungsi PHP yang dapat digunakan untuk mempermudah anda dalam membangun sistem otomasi anda.

## Fungsi yang tersedia

### Sistem
* [__](#__)
* [config](#config)
* [debug](#debug)
* [debugBox](#debugbox)
* [dd](#dd)
* [dump](#dump)
* [getArrayData](#getarraydata)
* [isCli](#iscli)
* [isDev](#isdev)
* [ip](#ip)
* [writeLog](#writelog)
* [xssFree](#xssfree)
### Angka dan Huruf
* [currency](#currency)
* [number](#number)
* [v](#v)
### Tampilan
* [toastr](#toastr)
### Http
#### Pengalihan
* [redirect](#redirect)
* [flash](#flash)
#### Url
* [pluginUrl](#pluginurl)
* [pluginNavigateTo](#pluginnavigateto)

## Sistem
##### ```__()```
fungsi ```__()``` digunakan untuk melakukan proses terjemahan bahasa pada SLiMS yang diproses oleh pustaka ```SLiMS\Polyglot```
```php
echo __('Home'); // keluaran dalam bahasa Indonesia menjadi "Beranda"
```
##### ```config()```
fungsi ```config()``` digunakan untuk memuat dan mengambil isi berkas konfigurasi yang tersimpan di folder ```config/``` atau pengaturan sistem yang berada  pada database di tabel ```setting```. Fungsi ini berkaitan dengan pustaka ```SLiMS\Config```
```php
echo config('library_name'); // keluaran : <nama_perpustakaan> yang diatur pada modul sistem.
// jika tidak tersedia maka makan mengembalikan dengan data kosong

/* Apabila anda ingin alternatif keluaran lain jika konfigurasi yang dicari 
tidak ditemukan maka anda bisa menambahkan argument kedua setelah nama konfigurasi.*/
echo config('library_name', 'SLiMS'); // Keluaran : SLiMS jika konfigurasi library_name tidak ada

/* Hasil keluaran dari fungsi ini sangatlah bermacam-macam, bergantung 
pada data apa yang disimpan di folder ```config/``` maupun tabel ```setting``` */

foreach(config('database.nodes', []) as $node) {
        dump($node);
}

/* Penggunaan titik diantara "database" dan "node" merupakan pemformataan 
pemanggilan data yang diberlakukan oleh pustaka ```SLiMS\Config```. 
Dapat diartikan seperti ini isi file config/database.php
*/
return ['nodes' => [...]];

/* maka database merupakan 
nama file/konfigurasi nya, serta nodes
merupakan data yang ada di dalam file/ruas tersebut */

// jika ditulis dalam native script
$database = require SB . 'config/database.php';

foreach($database['nodes'] as $node) {
        dump($node);
}
```
:::warning
```config()``` tidak dapat dipanggil apabila dipanggil pada file yang memang dijalankan pada proses bootstraping seperti ```lib/DB.php dll``` atau proses sebelum file/helper.inc.php
:::

##### ```debug()```
fungsi ini digunakan untuk melakukan proses awakutu / ***debug*** dimana anda dapat menampilkan isi dari sebuah proses yang sedang terjadi.
```php
debug('Judul debug', $_POST);
```
:::info
fungsi ini akan bekerja ketika ***environment***/lingkungan ***development***/pengembangan dan memanfaatkan pustaka ```symfony/var-dumper```  dan berkaitan dengan fungsi [dd()](#dd) dan [dump()](#dump)
::: 

##### ```debugBox()```
fungsi ini tidak berbeda jauh dengan ```debug()```, perbedaannya terletak di ***output***/keluaran nya, fungsi ini akan menghasilkan kelauran html yang terformat dan secara bawaan tidak menampilkan hasilnya jika tidak terdapat galat dan begitupun sebaliknya.
```php
debugBox($_POST);
```

##### ```dump()```
Fungsi ini memanfaatkan pustaka ```symfony/var-dumper``` yang memiliki tujuan seperti fungsi ```debug()``` namun dengan ciri khas dari ```symfony``` tanpa memberhentikan proses yang sedang berjalan.
```php
dump($variabel1, $variabel2, $dst);
```

##### ```dd()```
fungsi ini sama dengan fungsi [dump()](#dump), perbedaannya ada pada perilaku yang diberikan jika ```dump()``` tidak memberhentikan proses dan ```dd()``` sebalinya karena akronim dari fungsi tersebut yaitu ```dump and die``` .
```php
dd($variabel1, $variabel2, $dst);
```

##### ```getArrayData()```
fungsi ini digunakan untuk mengambil data pada level terdalam pada sebuah tipe data ```array```. Pada dasarnya ketika anda memiliki data dengan tipe ```array``` seperti ini:
```php
$array = [
   'level_1' => [
        'level_2' => [
                'level_3' => [
                        'isi1' => 'satu',
                        'isi2' => 'dua',
                        'isi3' => 'tiga',
                        'isi4' => 'empat',
                        'isi5' => 'lima',
                ]
        ]
   ]
];
```
untuk dapat mengakses konten yang berada pada indeks ```isi1``` maka kita perlu menulis seperti ini
```php
echo $array['level_1']['level_2']['level_3']['isi1'];
```
cara pemanggilan diatas akan berdampak galat apabila kita salah memasukan indeks pada level tertentu. Maka dengan mengguna fungsi ini kita dapat menentukan ```output``` apa yang akan keluar jika apa yang kita cari tidak ditemukan. Misal saja kita salah memasukan indeks ```array```.
```php
echo $array['level_1']['level_20']['level_3']['isi1']; // akan muncul error undefined index level_20

// jika anda ingin menghindarinya maka perlu membuat seperti ini:
$default = '';
if (isset($array['level_1'])) {
        if (isset($array['level_1']['level_2'])) {
                if (isset($array['level_1']['level_2']['level_3'])) {
                        if (isset($array['level_1']['level_2']['level_3']['isi1'])) {
                               $value = $array['level_1']['level_2']['level_3']['isi1']; 
                        }         
                }        
        }
}
echo $value??$default;
// atau dengan versi yang lainnya
```
Maka dengan fungsi ini anda dapat menghindari penulisan skrip seperti diatas dengan ini:
```php
echo getArrayData($array, 'level_1.level_2.level_3.isi1'); // output satu jika tidak ditemukan maka akan kosong

// atau jika anda ingin default output yang lain maka anda dapat menulis seperti ini
echo getArrayData($array, 'level_1.level_20.level_3.isi1', 'output_lain'); // output satu jika tidak ditemukan maka akan kosong
```

##### ```isCli()```
fungsi yang digunakan untuk mengetahui apakah lingkungan kerja yang sedang anda gunakan apakah berada di ```Cli```(***Command Line Interface***) atau tidak.
```php
if (isCli()) {
  // tulis kode anda disini
}
```

##### ```isDev()```
fungsi ini digunakan untuk mengetahui kondisi ```environment```/lingkungan SLiMS anda saat ini apakah ada dalam lingkungan ```development```/pengembangan atau ```production```/produksi.
```php
if (isDev()) {
   // kode yang ada didalam kondisi ini akan berjalan
   // jika SLiMS dalam mode enviroment development
}
```

##### ```ip()```
fungsi ini digunakan untuk mendapatkan alamat ip yang mengakses SLiMS anda dengan memanfaatkan pustaka ```slims/ip```. Selain mengambil alamat ip fungsi ini juga dapat dikondisikan ketika SLiMS anda berada di balik ```server proxy```.
```php
// mendapatkan informasi alamat ip 
echo ip()->get();

// atau cukup
echo ip(); // contoh : 36.125.25.100

// mendeteksi apakah SLiMS berada di balik server Proxy atau tidak.
if (ip()->isBehindProxy()) {
     // tulisak kode ingin anda terapkan
     // jika berada di balik server proxy
}

// mendapatkan alamat ip server proxy
echo ip()->getProxyIp();

// menetapkan informasi mengenai bagaimana mendapat
// alamat ip pengakses (secara bawaan: REMOTE_ADDR)
ip()->setSourceRemoteIp('CF-Connecting-IP'); // contoh disini menggunakan Cloud Flare

// menetapkan informasi bagaimana mengetahui apakah
// berada di balik server proxy atau tidak (secara bawaan: HTTP_X_FORWARDED_FOR)
ip()->setProxyKey('CF-Connecting-IP');
```

##### ```writeLog()```
fungsi ini digunakan untuk membuat catatan sistem. Berikut penggunaannya:

```php
writeLog('tipe log, contoh system|member|staff', 'id bisa merujuk ke user_id dll', 'lokasi dimana catatan dibuat. Contoh: bibliography|circulation', 'pesan yang ingin dicatat');
```

##### ```xssFree()```
fungsi ini berguna untuk memfilter karakter agar terbeas dari karakter html.
```php
echo xssFree('<h1>Hai</h1>'); // output : Hai
```

## Angka dan Huruf
##### ```currency()```
fungsi berguna untuk memformat sebuah karakter angka menjadi angka yang lengkap dengan format mata uang, menggunakan pustaka ```slims/currency``` yang bergantung dengan ekstensi ```php-intl``` berdasarkan bahasa yang digunakan oleh SLiMS atau jenis mata uang yang diatur pada submenu ```currency settings``` pada modul sistem.
```php
echo currency(3000); // output : Rp. 3.000,00

// apabila ekstensi php-intl tidak tersedia
// maka outputnya akan dikembalikan seperti apa yang diinputkan
echo currency(3000); // output : 3000
```
##### ```number()```
fungsi ini digunakan untuk memformat sebuah inputan menjadi tipe data tertentu seperti, ```float```,```currency```,```integer```,```decimal```.

```php
number("3.125")->toFloat(); // output: 3.125
number(3125)->toCurrency(); // output: Rp. 3.125,00
number(3.125)->toInteger(); // output: 3
number(3125)->toDecimal(decimalNumber: 3, decimalSeparator: '.', thousand: ','); // output: 3,125.000
```

Selain mengubah sebuah inputan menjadi tipe data tertentu maka fungsi ini juga bisa digunakan  untuk mengetahui bagaimana mengambil posisi, memecah  dari karakter yang diinputkan.

```php
$input = number(31250);

// mendapatkan panjang karakter
echo $input->len(); // output : 5

// mendapatkan posisi tertentu dari $input
echo $input->get(0,3); // output : 312

$input->chunk(2); // output array : [31,50]

echo $input->mod(5); // output : 0
```

Selain posisi fungsi ini juga bisa membulatkan atau menyederhanakan angka.

```php
$input = number('3.8655');

// pembulatan dengan angka desimal tertentu
echo $input->round(); // output : 4

// pembulatan dengan jumlah angka desimal tertentu
echo $input->round(2); // output : 3.87

// pembulatan keatas tanpa mempertimbangkan aturan desimal
echo $input->ceil(); // output : 4
```

##### ```v()```
fungsi ini digunakan untuk membuat karakter acak yang nanti akan digabungkan dengan nama file statis seperti file dengan ekstensi ```.js``` dan ```.css``` dengan tujuan untuk memperbaharui ***caching*** file statis di ***Web Browser***/Peramban Web. Tiap karakter yang dihasilkan akan tetap sama selama ***environment*** dalam mode ***production*** dan akan berubah ketika anda masuk ke dalam modul sistem pada menu pengaturan sistem karena pada ***event*** tersebut akan menghasilkan nomor acak pada konfigurasi ```$sysconf['static_file_version']``` yang dibutuhkan oleh fungsi ini.

```php
$script = '<script src="' . v('app.js') . '"/>';

echo $script; // contoh output : <script src="app.js?v=a5f86"/>
```

## Tampilan
##### ```toastr()```
fungsi ini digunakan untuk menampilkan notifikasi khusus yang memanfaatkan pustaka javascript yaitu ```toastr```. Gaya yang ditampilkan seperti ```success```,```info```,```warning```, dan ```error```.

```php
toastr('Tulisa pesan anda disini')->success();

// atau jika anda ingin judul notifikasi yang berbeda 
toastr('Tulisa pesan anda disini')->success('Yay Berhasi');

// metode success(), dapat diganti menjadi info(), warning(), dan error()

// Apabila anda salah mengetikan gaya notifikasi nya
// maka yang akan tampil adalah notifikasi bawaan dari
// browser yang sedang digunakan.

toastr('Tulisa pesan anda disini')->sukses();
```

## Http
### Pengalihan
##### ```redirect()```
fungsi ini digunakan untuk mengalihkan suatu halaman ke halaman lain yang memanfaatkan pustaka ```slims/redirect```.

```php
// pengalihan ke laman lain
redirect('https://foo.com');

// pengalihan ke halaman tertentu didomain
// yang sama
redirect('/page/login');

// Ke path/page tertentu di SLiMS
redirect()->toPath('login'); // domain.com/?p=login

// Mengalihkan dengan metode refresh
redirect()->refresh('?p=login');

// Mengalihkan ke halaman sebelumnya
// misal akses dari halamanform $_POST dari ?p=member ke ?p=login
redirect()->back();

// menghalihkan dengan mengikutkan 
// informasi response header
redirect()->withHeader('X-Rate-Limit', 59)->to('/');
// atau
redirect()->withHeader([
   ['X-Custom-Header', 'foo'],
   ['X-Rate-Limit', 59]
])->to('/');

// mengalihkan halaman dengan meninggalkan pesan,
// memanfaatkan pustaka slims/flash
redirect()->withMessage('login_error', 'Maaf username dan password salah')->back();

// mengalihkan halaman tertentu via pustaka jQuery SimbioAJAX
redirect()->simbioAJAX('url yang akan dirujuk');

// mengalihkan dengan metode http POST
redirect()->simbioAJAX(url: 'url yang akan dirujuk', data: json_encode(['age' => 20, 'name' => 'Foo']));

// mengalihkan pada selector tertentu
redirect()->simbioAJAX(selector: '#preview', url: 'url yang akan dirujuk');

// pada posisi tertentu
redirect()->simbioAJAX(position: 'parent.', selector: '#preview', url: 'url yang akan dirujuk');

// pengalihan dengan waktu delay dakan detik
redirect()->simbioAJAX(timeout: 5, url: 'url yang akan dirujuk');
```


##### ```flash()```
fungsi ini digunakan untuk menampilkan pesan sementara atau temporer ketika proses ```http``` telah selesai. Pada SLiMS ini digunakan ketika proses ```login``` tidak berhasil atau dapat digunakan untuk kebutuhan lain.

```php
$login = false;

if ($login === false) {
    flash('login_error', 'Maaf login tidak berhasil');
    redirect()->back();
}

// mengecek apakah ada pesan login error atau tidak
if (flash()->has($key = 'login_error')) {
    echo flash()->get($key);
}

// atau jika anda ingin mengecek untuk lebih dari satu
// pesan
if ($key = flash()->inlcudes('wrong_password','csrf_failed','empty_field','captchaInvalid')) {
    echo flash()->get($key);
}

// atau jika anda ingin menampilkan pesan dengan template
// tertentu berdasarkan kategori seperti danger,warning,success, info
if ($key = flash()->inlcudes('wrong_password','csrf_failed','empty_field','captchaInvalid')) {
    flash()->danger($key); // ganti dengan gaya yang disebutkan diatas
}
```

### Url
##### ```pluginUrl()```
fungsi ini berguna untuk membuat url pada plugin yang aktif/sedang digunakan.

```php
echo pluginUrl(); // output : /admin/plugin_container.php?mod=system&id=a86efea58....

echo pluginUrl(['action' => 'delete']); // output : /admin/plugin_container.php?mod=system&id=a86efea58....&action=delete

// mereset url dengan format plugin_container.php?id=<id>&mod=<mod>
echo pluginUrl(reset: true);
```

##### ```pluginNavigateTo()```
fungsi ini digunakan untuk menghasilkan url yang berkaitan dengan plugin yang sedang aktif baik berada dalam folder yang sama atau berbeda.

```php
/**
 * Struktuer direktori
 * /plugins
 * --- /satu
 * ------ satu.plugins.php
 * ------ satu_menu_pertama.php
 * ------ satu_menu_kedua.php
 */
// didalam file satu_menu_pertama.php
redirect()->simbioAJAX(pluginNavigateTo('satu_menu_kedua.php')); // maka halaman akan teralihkan ke file satu_menu_kedua.php
```
