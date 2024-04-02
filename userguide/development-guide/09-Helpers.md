SLiMS hadir dengan berbagai macam fungsi PHP yang dapat digunakan untuk mempermudah anda dalam membangun sistem otomasi anda.

## Fungsi yang tersedia

### Sistem
* [__](#__)
* [config](#config)
* [debug](#debug)
* [debugBox](#debugBox)
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
<?php
echo __('Home'); // keluaran dalam bahasa Indonesia menjadi "Beranda"
```
##### ```config()```
fungsi ```config()``` digunakan untuk memuat dan mengambil isi berkas konfigurasi yang tersimpan di folder ```config/``` atau pengaturan sistem yang berada  pada database di tabel ```setting```. Fungsi ini berkaitan dengan pustaka ```SLiMS\Config```
```php
<?php
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
```config()``` tidak dapat dipanggil apabila dipanggil pada file yang memang dijalankan pada proses bootstraping seperti lib/DB.php dll
:::