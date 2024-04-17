---
title: Penggunaan Database
description: Sejak versi 9 (Bulian), SLiMS hadir dengan dua cara untuk berkomunikasi dengan database yaitu MySQLi dan PDO. Adapun kedua nya sama-sama berfungsi untuk mengambil data dari MySQL/MariaDB via PHP dengan penulisan sintak yang berbeda....
image: https://static.slims.web.id/docs/5.2-penggunaan.png
keywords: [database slins, konfigurasi database di SLiMS]
---
Sejak versi 9 (Bulian), SLiMS hadir dengan dua cara untuk berkomunikasi dengan database yaitu MySQLi dan PDO. Adapun kedua nya sama-sama berfungsi untuk mengambil data dari MySQL/MariaDB via PHP dengan penulisan sintak yang berbeda. Berikut contohnya:
#### MySQLi
```php
<?php
// Mengambil data tunggal
$query = $dbs->query('select * from `biblio` where `biblio_id` = 1');
$data = $query->fetch_assoc(); // alternative lain $query->fetch_array(), $query->fetch_row(), $query->fetch_object()

// Mengambil data jamak
// selalu gunakan metoda escape_string 
// ketika hendak memasukan input user kedalam query anda
// untuk menghindari SQL Injection
$title = $dbs->escape_string($_GET['title']); 
$query = $dbs->query("select * from `biblio` where `title` like '%$title%'");
$result = [];
while($data = $query->fetch_assoc()) {
    $result[] = $data;
}

// lakukan sesuatu dibawah ini berdasarkan data yang anda ambil
```
#### PDO
```php
<?php
use SLiMS\DB;

// Mengambil data tunggal
$query = DB::getInstance()->query('select * from `biblio` where `biblio_id` = 1');
$data = $query->fetch(PDO::FETCH_ASSOC); // alternative lain $query->fetch(PDO::FETCH_NUM), $query->fetch(PDO::FETCH_OBJ), $query->fetchObject() dll

// Mengambil data jamak
// selalu gunakan prepare statement 
// ketika hendak memasukan input user kedalam query anda
// untuk menghindari SQL Injection
$query = DB::getInstance()->prepare("select * from `biblio` where `title` like ?");
$query->execute(['%'.$_GET['title'].'%']);

// atau
$query = DB::getInstance()->prepare("select * from `biblio` where `title` like :title");
$query->execute(['title' => '%'.$_GET['title'].'%']);

$result = [];
while($data = $query->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $data;
}

// lakukan sesuatu dibawah ini berdasarkan data yang anda ambil
```
Selengkapnya anda dapat membaca dokumentasi resmi dari [PHP mengenai penggunaan PDO](https://www.php.net/manual/en/book.pdo.php).
### Perbedaan penggunaan MySQLi dan PDO
#### Global scope
Ketika anda menggunakan MySQLi atau $dbs didalam sebuah ``` function() ``` maka anda tidak bisa menulis seperti ini
```php
function ambilData() {
    $query = $dbs->query('select * from biblio');
    // skrip selanjutnya
}
```
ketika anda menulis seperti skrip diatas maka PHP akan menampilkan **error** mengenai variabel ``` $dbs ``` tidak tersedia. Solusinya yaitu:
```php
function ambilData($dbs) {
    $query = $dbs->query('select * from biblio');
    // skrip selanjutnya
}

// atau 

function ambilData() {
    global $dbs;
    $query = $dbs->query('select * from biblio');
    // skrip selanjutnya
}
```

Namun apabila anda menggunakan PDO atau ``` DB::class ``` maka anda tidak perlu menggunakan **global scope** apabia ingin memanggil nya dalam ``` function ```. Contoh nya sebagai berikut:
```php
function ambilData() {
    $query = \SLiMS\DB::getInstance()->query('select * from biblio');
    // skrip selanjutnya
}
```
atau bisa seperti ini:
```php
<?php
use \SLiMS\DB; // unuk skrip harus dibawah <?php

function ambilData() {
    $query = DB::getInstance()->query('select * from biblio');
    // skrip selanjutnya
}
```
#### Simpulan
Jadi kesimpulannya adalah ada dicara pemanggilannya. Jika anda menggunakan MySQLi anda harus memanfaatkan variabel $dbs, tetapi di PDO anda tidak perlu untuk menggunakan variabel untuk menggunakannya.

### Menggunakan MySQLi via ```DB::class```
Jika anda ingin menggunakan MySQLi namun tidak bergantung pada variabel ```$dbs``` maka anda dapat memanggil seperti berikut:
```php
$query = \SLiMS\DB::getInstance('mysqli')->query('select * from biblio');
```
atau
```php
use \SLiMS\DB;
$query = DB::getInstance('mysqli')->query('select * from biblio');
```
walaupun menggunakan ``` DB::class ``` anda tetap bisa menggunakan ```API``` dari MySQLi seperti ```fetch_assoc``` dll seperti berikut:
```php
$result = [];
while($data = $query->fetch_assoc())
{
    $result[] = $data;
}
```

### Menganti koneksi
Jika anda menggunakan ```\SLiMS\DB``` untuk mengambil data dari *database* maka anda dapat menggunakan lebih dari satu koneksi database. Secara bawaan pustaka tersebut menggunakan profil [nodes SLiMS](Intro#konfigurasi) untuk mengganti sebagai berikut:
#### Sementara
```php
$db1 = DB::getInstance(); // akan menggunakan profil koneksi SLiMS
$db2 = DB::connection('non-default'); // akan menggunakan profil koneksi non-default (nama bisa anda sesuaikan)
```
untuk menambahkan koneksi yang lain dapat membaca pada [referensi sebelumnya](Intro#menambahkan-koneksi-lain)

:::note
Sebelum anda menggunakan MySQLi via ```$dbs``` atau ```DB::class``` dan PDO pastikan pada file yang sedang anda gunakan sudah menempatkan ```require '<slims-root-path>/sysconfig.inc.php'``` pada posisi paling atas setelah skrip ``` use SLiMS\DB; ``` dll;
:::