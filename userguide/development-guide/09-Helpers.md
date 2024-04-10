SLiMS hadir dengan berbagai macam fungsi PHP yang dapat digunakan untuk mempermudah anda dalam membangun sistem otomasi anda.

## Fungsi yang tersedia

### Sistem
* [__](#__)
* [config](#config)
* [debug](#debug)
* [debugBox](#debugbox)
* [dd](#dd)
* [dump](#dump)
* [getArrayData](#getArrayData)
* [isCli](#isCli)
* [isDev](#isDev)
* [ip](#ip)
* [writeLog](#writeLog)
* [xssFree](#writeLog)
### Angka dan Huruf
* [currency](#currency)
* [number](#number)
* [v](#v)
### Tampilan
* [commonList](#commonList)
* [jQuery](#jQuery)
* [toastr](#toastr)
### Http
#### Pengalihan
* [flash](#flash)
* [redirect](#redirect)
#### Url
* [pluginUrl](#pluginUrl)
* [pluginUrl](#pluginUrl)

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
cara pemanggilan diatas akan berdampak galat apabila kita salah memasukan indeks pada level tertentu. Maka dengan mengguna fungsi ini kita dapat menentukan ```output``` apa yang akan keluar jika apa yang kita cari tidak ditemukan. Misal saja kita salah memasukan indeks ```array```
```php
echo $array['level_1']['level_20']['level_3']['isi1']; // akan muncul error undefine index level_20
``` 