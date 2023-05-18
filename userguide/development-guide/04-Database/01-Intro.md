# Permulaan
### Ihwal
SLiMS menggunakan MySQL/MariaDB sebagai default RDMS (*Relational Database Management System*) untuk menyimpan data. Adapun ini tidak menutup bahwa SLiMS tidak dapat menggunakan *database* selain RDBMS. Pada kasus tertentu SLiMS dapat diintegrasikan dengan *database* No-SQL seperti Redis, ElasticSearch, SOLR, dan MeiliSearch dll bergantung kepada kebutuhan masing-masing pengguna.
### Konfigurasi
Konfigurasi mengenai *database* di SLiMS tersimpan di **config/database.php**. File tersebut terbentuk secara otomatis ketika anda pertama kali menginstall SLiMS melalui *installer* bawaan dari SLiMS. Namun, anda dapat mengubahnya secara manual jika memang memungkinkan. Berikut isi dari file tersebut:
```php
<?php

return [
    /**
     * Default database node profile
     */
    'default_profile' => 'SLiMS',

    /**
     * SLiMS as Service, One SLiMS for many library
     * ----------------------------------------------------
     * 
     * Switching database node access based on rule,
     * such as domain, ip, port etc
     * 
     * How to :
     * 1. make file with name database_proxy.php in config/
     * 2. make your own rule in that file.
     * 3. change this value to true
     */
    'proxy' => false,

    /**
     * Nodes profile
     */
    'nodes' => [
        'SLiMS' => [
            'host' => '_DB_HOST_',
            'database' => '_DB_NAME_',
            'port' => '_DB_PORT_',
            'username' => '_DB_USER_',
            'password' => '_DB_PASSWORD_',
            'options' => [
                'storage_engine' => '_STORAGE_ENGINE_'
            ]
        ]
    ]
];
```

Keterangan:
1. ``` _DB_HOST_ ``` : Merupakan alamat IP/Host dari mesidn MySQL/MariaDB yang anda gunakan.
2. ``` _DB_NAME_ ``` : Nama database yang akan digunakan.
3. ``` _DB_PORT_ ``` : Port database yang digunakan. Secara bawaan MySQL/MariaDB menggunakan port 3306.
4. ``` _DB_USER_ ``` : Nama pengguna yang digunakan untuk berkomunikasi dengan MySQL/MariaDB.
5. ``` _DB_PASSWORD_ ``` : Kata sandi dari nama pengguna yang digunakan.

Terkait ``` _STORAGE_ENGINE_ ``` bersifat opsional yang berisi nama *[storage engine](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html)* yang digunakan oleh SLiMS pada MySQL/MariaDB.
### Penggunaan
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