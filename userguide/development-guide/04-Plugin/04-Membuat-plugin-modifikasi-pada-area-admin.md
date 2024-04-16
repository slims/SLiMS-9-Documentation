---
title: Cara membuat plugin diarea admin
description: Langkah-langkah membuat plugin untuk memodifikasi menu yang ada diarea admin
keywords: [Plugin, Admin, SLiMS Plugin Admin]
image: https://static.slims.web.id/docs/4.4-buat-pugin-admin.png
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
Masih banyak lagi contoh penggunaan hook, anda dapat mengganti proses hook ``` bibliography_before_save ``` dengan [proses yang lain](/development-guide/Plugin/Membuat-plugin-modifikasi-halaman-pada-OPAC).
### Menambah menu kustom pada submenu
Pada [materi sebelumnya](/development-guide/Plugin/Intro#menu) mengenai modifikasi menu. Kali ini kita akan mempraktikan terkait menambahkan kustom menu kedalam submenu pada modul bibliography tanpa merubah isi dari file submenu.php yang ada di dalam modul tersebut. Berikut langkahnya:

1. Buat folder di ``` plugins/ ``` dengan nama **custom_menu**.
2. Pada folder yang dibuat pada langkah pertama, buat sebuah file dengan nama **custom_menu.plugin.php**.
3. Isi dari file yang dibuat pada langkah ketika seperti skrip dibawah ini
```php
<?php
/**
 * Plugin Name: Custom Menu
 * Plugin URI: -
 * Description: Menambah kustom menu
 * Version: 1.0.0
 * Author: Foo
 * Author URI: https://foo.who
 */
use SLiMS\Plugins;
$plugins = Plugins::getInstance();

$plugins->registerMenu('bibliography', 'Kustom Menu', __DIR__ . '/custom_menu.php');
```
4. Buat sebuah file dengan nama ``` custom_menu.php ``` didirektori yang sama dengan **custom_menu.plugin.php**
5. Isi file pada langkah ke 4 dengan skrip dibawha ini:
```php
<?php
echo "<h1>Hai ini isi dari custom_menu.php</h1>";
```
6. Setelah itu aktifkan plugin itu pada modul `System > Plugin` dengan nama **Custom Menu**. ![custom_menu](/img/plugin-04-custom-menu.png)
7. Maka akan muncul menu baru diujung paling bawah seperti berikut: ![custom_menu](/img/plugin-04-custom-menu-on-biblio.png)
8. Jika diklik maka muncul seperti gambar dibawah berikut: ![custom_menu](/img/plugin-04-content-of-custom_menu.png)
### Merubah isi menu yang sudah ada pada submenu
Pada materi diatas dijelaskan bahwa kita dapat menambah menu kustom pada submenu. Tak jauh berbeda dengan materi diatas, kali kita akan memanipulasi isi dari sebuah menu yang sudah ada. Langkah yaitu melanjutkan dari langkah sebelumnya:
1. Pada folder ``` plugins/custom_menu ``` buat sebuah file bernama custom_index.php
2. Buka file submenu.php pada folder ``` admin/modules/bibliography/submenu.php ```, salin skrip yang ada didalam kotak merah seperti dibawah berikut:
![submenu](/img/plugin-04-custom_index_submenu.png)
3. Buka file custom_menu.plugin.php pada folder ``` plugins/custom_menu ``` lalu tambah skrip dibawah berikut:
```php
$plugins->registerMenu('bibliography', __('Bibliographic List'), __DIR__ . '/custom_index.php');
```
4. Maka skrip lengkapnya sebagai berikut:
```php
<?php
/**
 * Plugin Name: Custom Menu
 * Plugin URI: -
 * Description: Menambah kustom menu
 * Version: 1.0.0
 * Author: Foo
 * Author URI: https://foo.who
 */
use SLiMS\Plugins;
$plugins = Plugins::getInstance();

$plugins->registerMenu('bibliography', 'Kustom Menu', __DIR__ . '/custom_menu.php');
$plugins->registerMenu('bibliography', __('Bibliographic List'), __DIR__ . '/custom_index.php');
```
5. Isi file yang sudah dibuat pada langkah ke 1 dengan skrip berikut:
```php
<?php
echo "<h1>Hai ini isi dari custom_index.php</h1>
<p>yang menggantikan isi dari admin/modules/bibliography/index.php</p>";
```
6. Refresh halaman saat ini masuk ke modul ``` biblography ```. Jika langkah 5 berhasil maka muncul sebagai berikut:
![proof](/img/plugin-04-custom_index_proof.png)
#### Penjelasan
```php
$plugins->registerMenu('bibliography', __('Bibliographic List'), __DIR__ . '/custom_index.php');
```
1. ``` bibliography ``` : adalah nama modul yang dituju, anda dapat menganti modul tersebut dengan modul yang tersedia seperti ```bibliography, membership, master_file, circulation, stock_take, system, reporting, dan serial_control  ``` setiap pendaftaran menu akan muncul disetiap modul yang disebutkan. Namun, apabila modul yang disebutkan tidak tersedia/aktif di SLiMS maka menu tidak akan pernah muncul.
2. ``` __('Bibliographic List') ``` : Adalah nama menu yang tersedia di modul ***Bibliography***. Kenapa harus diawali dengan ``` __( ``` dan akhiri ```)``` karena metoda tersebut digunakan untuk menterjemahkan setiap kata yang diletekan dikeduanya. Jadi plugin anda dapat dibaca diberbagai macam bahasa.
3. ``` __DIR__ . '/custom_index.php' ``` : Nama file yang akan digunakan untuk menggantikan file sebenarnya pada modul  bibliography.