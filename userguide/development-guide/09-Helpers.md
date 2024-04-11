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
* [commonList](#commonlist)
* [jQuery](#jquery)
* [toastr](#toastr)
### Http
#### Pengalihan
* [flash](#flash)
* [redirect](#redirect)
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
$input = number(30000);

echo $input->len(); // output : 5
```