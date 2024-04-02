---
title: Pengantar
description: Sistem plugin merupakan inovasi yang dihadirkan sejak versi SLiMS Bulian 9.3.0 oleh Mas....
image: https://slims.web.id/web/site/templates/assets/images/logo.png
keywords: [plugins slims, slims plugin, dokumentasi plugin SLiMS]
---

# Pengantar
### Permulaan
Sistem plugin merupakan inovasi yang dihadirkan sejak versi SLiMS Bulian 9.3.0 oleh Mas [Ido Alit](https://github.com/idoalit/). Tujuan dari inovasi ini yaitu untuk mempermudah kerja dari pengembang SLiMS (dari sisi pengguna atau pihak yang membantu pengguna) dalam melakukan proses upgrade SLiMS dari versi sekarang ke versi yang lebih mutakhir.

### Persiapan
Hal yang perlu disiapkan (minimal) untuk membuat sebuah plugin seperti:
* Pengetahuan mengenai bahasa pemrograman **HTML (termasuk CSS), PHP, JS, dan SQL**
* Pemahaman mengenai penggunaan library dan tool seperti **composer (opsional)**

### Sistematika plugin
Semua plugin SLiMS secara *default* diletakan di folder `plugins/`, yang ditandai dengan ekstensi file `.plugin.php`. Seluruh plugin akan dipindai oleh SLiMS dengan kedalaman tingkat folder hingga 3 tinggkat.
```bash
# Contoh tingkat kedalaman folder yang dipindai
plugins/ # tingkat 0
--- biblio_adv_log.plugin.php # plugin tingkat 1
--- label_barcode/ # folder tingkat 1
------ label.plugin.php # plugin tingkat 2
--- contoh_plugin/ # folder tingkat 1
------ folder_didalam_contoh_plugin/ # folder tingkat 2
--------- plugin_didalam_contoh_plugin.plugin.php # plugin tingkat 3
```
dengan ini anda dapat membuat plugin dengan sistem hirarki.

### Format isi plugin
format isi digunakan untuk menginformasikan SLiMS mengenai informasi terkait pembuat plugin, versi plugin, deskrpsi plugin, dll.
```php
<?php
/**
 * Plugin Name: <nama plugin>
 * Plugin URI: <url untuk mengunduh plugin ini>
 * Description: <deskripsi plugin>
 * Version: <versi plugin dalam format Pemversian Semantic>
 * Author: <Nama Pembuat Plugin>
 * Author URI: <Alamat Media Sosial Pembuat Plugin>
 */
```
Isi informasi yang ada dengan menganti contoh isi yang ada, contoh: <nama_plugin> `menjadi nama anda`. Setelah itu, kita perlu mencantumpkan kelas pustaka SLiMS yaitu `SLiMS\Plugins` seperti berikut setalah informasi plugin sebelumnya:
```php
use SLiMS\Plugins;
```
lalu membuat variable plugin:
```php
$plugins = Plugins::getInstance();
```
Maka format isi plugin selengkapnya seperti ini:
```php
<?php
/**
 * Plugin Name: <nama plugin>
 * Plugin URI: <url untuk mengunduh plugin ini>
 * Description: <deskripsi plugin>
 * Version: <versi plugin dalam format Pemversian Semantic>
 * Author: <Nama Pembuat Plugin>
 * Author URI: <Alamat Media Sosial Pembuat Plugin>
 */
use SLiMS\Plugins;
$plugins = Plugins::getInstance();
```

### Tipe operasi plugin
Setelah anda paham mengenai format isi plugin, maka anda harus mencantumkan operasi apa yang akan dilakukan oleh plugin tersebut. Sistem plugin SLiMS berjalan dalam beberapa tipe, seperti [hook](#hook), [path](#path), dan [menu](#menu). 
#### **Hook** 
merupakan metoda yang digunakan oleh SLiMS untuk mengoperasikan beberapa perintah untuk melakukan modifikasi atau menambah atau menginterupsi operasi yang sudah/akan berjalan sesuai nama hook yang tersedia. Berikut daftar operasi hook yang tersedia di SLiMS:
```php
const ADMIN_SESSION_AFTER_START = 'admin_session_after_start';
const CONTENT_BEFORE_LOAD = 'before_content_load';
const CONTENT_AFTER_LOAD = 'after_content_load';
const BIBLIOGRAPHY_INIT = 'bibliography_init';
const BIBLIOGRAPHY_BEFORE_UPDATE = 'bibliography_before_update';
const BIBLIOGRAPHY_AFTER_UPDATE = 'bibliography_after_update';
const BIBLIOGRAPHY_BEFORE_SAVE = 'bibliography_before_save';
const BIBLIOGRAPHY_AFTER_SAVE = 'bibliography_after_save';
const BIBLIOGRAPHY_BEFORE_DELETE = 'bibliography_before_delete';
const BIBLIOGRAPHY_AFTER_DELETE = 'bibliography_after_delete';
const BIBLIOGRAPHY_CUSTOM_FIELD_DATA = 'advance_custom_field_data';
const BIBLIOGRAPHY_CUSTOM_FIELD_FORM = 'advance_custom_field_form';
const BIBLIOGRAPHY_BEFORE_DATAGRID_OUTPUT = 'bibliography_before_datagrid_output';
const CIRCULATION_AFTER_SUCCESSFUL_TRANSACTION = 'circulation_after_successful_transaction';
const MEMBERSHIP_INIT = 'membership_init';
const MEMBERSHIP_BEFORE_UPDATE = 'membership_before_update';
const MEMBERSHIP_AFTER_UPDATE = 'membership_after_update';
const MEMBERSHIP_BEFORE_SAVE = 'membership_before_save';
const MEMBERSHIP_AFTER_SAVE = 'membership_after_save';
const OVERDUE_NOTICE_INIT = 'overduenotice_init';
const DUEDATE_NOTICE_INIT = 'duedate_init';
const MODULE_MAIN_MENU_INIT = 'module_main_menu_init';
const OAI2_INIT = 'oai2_init';
```
Daftar diatas merupakan operasi hook yang terdaftar secara default di sistem plugin SLiMS. Namun ada beberapa yang tidak terdaftar namun tetap dapat bekerja dengan baik, berikut penjelasannya:
1. ``` ADMIN_SESSION_AFTER_START ``` : hook akan bekerja ketika sesi login admin dimulaui.
2. ``` CONTENT_BEFORE_LOAD ``` : hook ini berjalan di OPAC, dimana prosesnya akan bekerja sebelum konten OPAC dimuat.
3. ``` CONTENT_AFTER_LOAD ``` : ini kebalikan dari hook kedua, yaitu setelah konten pada OPAC dimuat.
4. ``` BIBLIOGRAPHY_INIT ``` : hook ini berada pada halaman utama pada modul **bibliografi**.
5. ``` BIBLIOGRAPHY_BEFORE_UPDATE ``` : hook ini beroperasi sebelum proses pembaharuan data bibliografi dimulai.
6. ``` BIBLIOGRAPHY_BEFORE_SAVE ``` : hook ini beroperasi sebelum proses penyimpanan data bibliografi dimulai.
7. ``` BIBLIOGRAPHY_AFTER_UPDATE ``` : hook ini beroperasi setelah proses pembaharuan data bibliografi dimulai.
8. ``` BIBLIOGRAPHY_AFTER_SAVE ``` : hook ini beroperasi setelah proses penyimpanan data bibliografi dimulai.
9. ``` BIBLIOGRAPHY_CUSTOM_FIELD_DATA ``` : hook ini merupakan operasi yang digunakan untuk mendaftarkan data ruas tambahan secara mahir.
10. ``` BIBLIOGRAPHY_CUSTOM_FIELD_FORM ``` : hook ini merupakan operasi yang digunakan untuk mendaftarkan ruas tambahan secara mahir.
11. ``` MEMBERSHIP_INIT ``` : tidak berbeda jauh dengan ``` BIBLIOGRAPHY_INIT ``` hanya saja ini berjalan di modul **membership**
12. ``` MEMBERSHIP_BEFORE_UPDATE ``` : hook ini mirip seperti ``` BIBLIOGRAPHY_BEFORE_UPDATE ```. Namun hanya pada modul **membership**.
13. ``` MEMBERSHIP_BEFORE_SAVE ``` : hook ini mirip seperti ``` BIBLIOGRAPHY_BEFORE_SAVE ```. Namun hanya pada modul **membership**.
14. ``` MEMBERSHIP_AFTER_UPDATE ``` : hook ini mirip seperti ``` BIBLIOGRAPHY_AFTER_UPDATE ```. Namun hanya pada modul **membership**.
15. ``` MEMBERSHIP_AFTER_SAVE ``` : hook ini mirip seperti ``` BIBLIOGRAPHY_AFTER_SAVE ```. Namun hanya pada modul **membership**.
16. ``` OAI2_INIT ``` : hook ini berjalan pada file oai2.php pada halaman utama, dapat digunakan untuk memodifikasi process pertukaran data melalui protokol oai-pmh

Berikut ini cara penggunaan hook yang tersedia pada daftar diatas:
```php 
<?php 
# Contoh
$plugins->register('<nama_hook>', function(){
    // lakukan suatu hal didalam block fungsi ini
});

// atau jika dipraktikan akan seperti ini
$plugins->register(Plugins::MEMBERSHIP_INIT, function(){
    // lakukan suatu hal didalam block fungsi ini
});

// atau jika anda tidak nyaman dengan penulisan Class::konstanta bisa
// juga seperti ini.
// sesuaikan saja dengan daftar hook yang tersedia
$plugins->register('membership_init', function(){
    // lakukan suatu hal didalam block fungsi ini
});

// atau bisa juga dengan gaya seperti ini
Plugins::hook(Plugins::MEMBERSHIP_INIT, function(){
    // lakukan suatu hal didalam block fungsi ini
});
```
#### **Path** 
Operasi ini merupakan cara yang digunakan untuk memodifikas tampilan halaman OPAC yang sudah ada tanpa merubah source code asli SLiMS. Misal path halaman member jika dicontohkan dalam bentuk URL secara penuh `http://localhost/slims/index.php?p=member`. Tampilan dalam halaman itu dapat anda ganti dengan menggunakan metoda ini. Berikut cara nya:
```php
// atau jika dipraktikan akan seperti ini
$plugins->registerMenu('opac', 'member', __DIR__ . '/member.inc.php');
// atau
Plugins::menu('opac', 'member', __DIR__ . '/member.inc.php');
// atau
Plugins::opac('member', __DIR__ . '/member.inc.php');
```
Penjelasan paramter pada fungsi `registerMenu()`:
1. `opac` : ini menandakan bahwa anda mendaftarkan menu/path baru pada OPAC.
2. `member` : nama path yang dipanggil melalui `?p=` seperti yang ada dicontoh URL di atas.
3. `__DIR__ . '/member.inc.php'` : merupakan lokasi file yang akan mengganti tampilan sebenarnya pada halaman `?p=member`.

Anda juga dapat mendaftarkan path lain nya yang tidak ada di SLiMS. Contoh sebagai berikut:
```php
// halaman custom, bebas pustaka
$plugins->registerMenu('opac', 'bebas pustaka', __DIR__ . '/sayabebas.inc.php');
```
Pada paramter ke **2** setiap spasi akan dikonversi menjadi `_` atau **underscore**. Contoh 'bebas pustaka' menjadi 'bebas_pustaka', maka ketika anda memanggil path itu dibrowser menjadi ✅ `http://localhost/slims/index.php?p=bebas_pustaka` bukan 🚫 `http://localhost/slims/index.php?p=bebas pustaka`.

#### **Menu**
Tak berbeda dengan sebelumnya, bagian ini merupakan penjelasan bagaimana menambah/merubah menu yang ada di setiap module saat login sebagai pustakawan. Ini mempermudah anda sebagai pengembang SLiMS dalam mendaftarkan menu pada modul tertentu tanpa harus merubah file `submenu.php` pada setiap module. Berikut cara nya:
```php
// atau jika dipraktikan akan seperti ini
$plugins->registerMenu('membership', 'Bebas Pustaka', __DIR__ . '/sayabebas.inc.php');
// atau
Plugins::menu('membership', 'Bebas Pustaka', __DIR__ . '/sayabebas.inc.php');
// atau
Plugins::membership('Bebas Pustaka', __DIR__ . '/sayabebas.inc.php');
```
Penjelasan paramter pada fungsi `registerMenu()`:
1. `membership` : ini menandakan bahwa anda mendaftarkan/merubah menu baru pada modul membership. Anda dapat mendaftarkan pada modul yang lain selama modul itu tersedia dan aktif.
2. `Bebas Pustaka` : nama menu yang akan muncul di daftar menu pada modul yang dituliskan pada parameter ke 1.
3. `__DIR__ . '/sayabebas.inc.php'` : merupakan lokasi file yang akan muncul ketika menu diklik.

:::note
Perbedaan fungsi `registerMenu()` pada operasi path dan operasi menu adalah penempatannya. Jika OPAC berada di halaman opac SLiMS, maka selain itu akan ditampilkan pada halaman admin jika memang modul nya tersedia.
:::
