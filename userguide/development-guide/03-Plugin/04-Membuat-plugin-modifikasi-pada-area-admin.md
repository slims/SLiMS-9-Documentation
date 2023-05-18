---
title: Cara membuat plugin diarea admin
description: Langkah-langkah membuat plugin untuk memodifikasi menu yang ada diarea admin
keywords: [Plugin, Admin, SLiMS Plugin Admin]
---
# Membuat Plugin Modifikasi Pada Area Admin
### Pengantar
Pada [materi sebelumnya](/development-guide/Plugin/Membuat-plugin-modifikasi-halaman-pada-OPAC) sudah dibahas mengenai langkah-langkah memodifikasi halaman yang ada di OPAC. Pada bagian ini kita akan belajar untuk membuat/memodifikasi halaman yang ada di area admin. Langkah yang akan digunakan tak berbeda jauh, seperti yang ada dibawah ini:
### Memanfaatkan operasi hook
Pada materi [hook](/development-guide/Plugin/Intro#hook) dijelaskan bagaimana kita melakukan manipulasi proses yang akan/belum terjadi di SLiMS, misalnya kita akan menginterupsi proses penyimpanan data sebelum data itu tersimpan. Lalu apa kegunaannya? kita dapat memberikan fitur-fitur yang kita inginkan dalam proses penyimpanan data, misalnya membuat percabangan penyimpnan dimana kita ingin sebelum data itu disimpan kita akan mengambil beberapa data yang ada lalu menyimpannya ditempat lain. Studi kasusnya yaitu menyimpan data yang ada di SLiMS ke database lain, seperti ElasticSearch, MeiliSearch dll yang akan digunakan sebagai basis data untuk pencarian. Kita akan buat contoh sederhana seperti berikut:
1. Buat folder di ``` plugins/ ``` dengan nama **hooking**.
2. Pada folder yang dibuat pada langkah pertama, buat sebuah file dengan nama **hooking.plugin.php**.
3. Isi dari file yang dibuat pada langkah ketika seperti skrip dibawah ini
```php
<?php
/**
 * Plugin Name: Hooking
 * Plugin URI: -
 * Description: Memanipulasi proses data di SLiMS
 * Version: 1.0.0
 * Author: Foo
 * Author URI: https://foo.who
 */
use SLiMS\Plugins;
$plugins = Plugins::getInstance();

$plugins->register('bibliography_before_save', function($data){
    toastr('Test hooking')->native();
});
```
4. Setelah itu aktifkan plugin itu pada modul `System > Plugin` dengan nama **hooking**. ![Example](/img/plugin-04-hooking-plugin.png)
5. Jika sudah anda buka menu ``` tambah bibliografi baru ``` modul bibliography dan buat sebuah data baru (anda bisa isi sembarang data misal saja dengan judul ``` test ```).
6. Apabila plugin berjalan dengan baik maka akan muncul seperti berikut (setelah anda menekan tombol simpan)
![proof](/img/plugin-04-hooking-test.png)

#### Penjelasan
lihat komentar pada skrip dibawah berikut:
```php
$plugins->register('bibliography_before_save', function($data){
    // disini anda dapat melakukan berbagai macam proses manipulasi data
    // bahkan sampai menginterupsi pun anda bisa. Lakukan apa yang
    // anda butuhkan di bagian ini.
    toastr('Test hooking')->native(); // ini sebagai contoh saja bisa diganti kok.
});
```
Masih banyak lagi contoh penggunaan hook, anda dapat mengganti proses hook ``` bibliography_before_save ``` dengan [proses yang lain](https://github.com/slims/slims9_bulian/blob/master/lib/Plugins.php#L21).
