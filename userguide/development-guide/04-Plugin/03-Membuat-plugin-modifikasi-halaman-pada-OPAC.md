---
title: Membuat plugin modifikasi halaman tertentu di OPAC
### Pengantar
description: Kadang kala kita membutuhkan fitur yang tidak tersedia secara bawaan di SLiMS seperti bebas pustaka dll. Beruntung nya SLiMS terkini sudah....
image: https://static.slims.web.id/docs/4.3-buat-pugin-opac.png
keywords: [plugins slims, slims plugin, dokumentasi plugin SLiMS]
---
# Membuat plugin modifikasi halaman tertentu di OPAC
### Pengantar
Kadang kala kita membutuhkan fitur yang tidak tersedia secara bawaan di SLiMS seperti bebas pustaka dll. Beruntung nya SLiMS terkini sudah mendukung hal tersebut dimana anda dimudahkan untuk proses pembuatannya yaitu dengan sistem plugin. Berdasarkan artikel sebelumnya sistem plugin SLiMS **mendukung manipulasi/membuat** halaman yang **sudah/belum** ada di SLiMS menjadi halaman kustom yang kita inginkan tanpa perlu repot mengutak-utik file aslinya.

### Contoh plugin modifikasi halaman yang sudah ada
Kita tahu url ```<url-slims-anda>/?p=member``` merupakan halaman area anggota, dimana mereka dapat masuk dan melakukan transaksi seperti reservasi buku dll. Kasus yang akan dicontohkan bagaimana membuat halaman tersebut berisi pesan sederhana dari **Pustakawan** mengenai layanan yang ada. Berikut langkahnya:

1. Buat sebuah folder baru di dalam folder ``` plugins/ ``` dengan nama **kustom_member** lalu masuk ke dalam folder tadi.
2. Setelah itu buat file **kustom_member.plugin.inc.php**
3. Isi file tersebut dengan skrip dibawah ini:
```php
<?php
/**
 * Plugin Name: Kustom Member
 * Plugin URI: -
 * Description: Belajar membuat plugin kustom page
 * Version: 1.0.0
 * Author: Foo
 * Author URI: https://foo.who
 */
use SLiMS\Plugins;
$plugins = Plugins::getInstance();

$plugins->registerMenu('opac', 'member', __DIR__ . '/member.inc.php');
```
4. Salin file yang berada di ``` lib/contents/member.inc.php ``` kedalam folder ``` plugins/kustom_member/ ``` 
5. Lalu buka file **member.inc.php** yang ada di folder ``` plugins/kustom_member/ ```. 
6. Kita coba untuk menambahkan sedikit informasi. Pada baris 978 atau cari skrip kurang lebih seperti ini:
```php
<div>
    <div class="tagline"><?php echo __('Library Member Login'); ?></div>
```
7. Setelah itu tambahkan skrip seperti ini
```php
<div>
    <div class="alert alert-info">Telah tersedia menu bebas pustaka dalam area anggota</div>
    <div class="tagline"><?php echo __('Library Member Login'); ?></div>
```
8. Setelah itu aktifkan plugin itu pada modul `System > Plugin`. Lalu buka halaman OPAC anda pada laman ``` <slims-url>/?p=member ```, dan lihat apa yang terjadi 😁. Bagaimana? sudah melihat hasilnya? nah dengan ini anda sudah membuat sebuah plugin yang memodifikasi halaman yang sudah ada di SLiMS tanpa merusak sumber aslinya.

### Contoh plugin modifikasi halaman yang belum ada
Tak berbeda jauh dengan langkah sebelumnya. Berikut langkahnya:
1. Buat sebuah folder baru di dalam folder ``` plugins/ ``` dengan nama **bebas_pustaka** lalu masuk ke dalam folder tadi.
2. Setelah itu buat file **bebas_pustaka.plugin.php**
3. Isi file tersebut dengan skrip dibawah ini:
```php
<?php
/**
 * Plugin Name: Bebas Pustaka
 * Plugin URI: -
 * Description: Belajar membuat plugin kustom page
 * Version: 1.0.0
 * Author: Foo
 * Author URI: https://foo.who
 */
use SLiMS\Plugins;
$plugins = Plugins::getInstance();

$plugins->registerMenu('opac', 'bebas_pustaka', __DIR__ . '/bebas_pustaka.php');
```
5. Buat file **bebas_pustaka.php** pada folder yang sebelumnya dibuat.
6. Lalu isi file tersebut dengan skrip dibawah berikut:
```php
<?php

echo "Bebas Pustaka";
```
7. Setelah itu aktifkan plugin itu pada modul `System > Plugin`. Lalu buka halaman OPAC anda pada laman ``` <slims-url>/?p=bebas_pustaka ```, dan lihat apa yang terjadi 😁. Bagaimana? sudah melihat hasilnya? nah dengan ini anda sudah membuat sebuah plugin yang memodifikasi halaman yang sudah ada di SLiMS tanpa merusak sumber aslinya.

### Keterangan
pada skrip diatas terdapat 
```php 
$plugins->registerMenu('opac', 'member', __DIR__ . '/member.inc.php'); 
``` 
berikut penjelasannya:
1. ``` opac ``` : Merupakan lokasi dimana plugin tersebut akan muncul yaitu OPAC.
2. ``` member ``` : Merupakan nama path yang akan diakses via ``` ?p=<path> ``` misal ``` ?p=member ```.
3. ``` __DIR__ . '/member.inc.php' ``` : Merupakan lokasi file hasil modifikasi yang kita buat