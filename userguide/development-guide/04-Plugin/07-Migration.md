---
title: Migration
description: Ini merupakan bagian dari fitur ```Plugin``` yang digunakan untuk melakukan proses migrasi basis data atau akrab dikenal sebagai Database Migr...
keywords: [Migration,database,SLiMS]
image: https://static.slims.web.id/docs/4.5-migration.png
---
Ini merupakan bagian dari fitur ```Plugin``` yang digunakan untuk melakukan proses migrasi basis data atau akrab dikenal sebagai Database Migration. Sebuah proses dimana anda sebagai pengembang/*developer* plugin dapat dengan leluasa memindahkan struktur tabel yang anda buat khusus untuk plugin anda tanpa perlu repot memindahkan manual dengan mengekspor file .sql dll kedalam database anda.
### Langkah-Langkah
1. Buat sebuah folder bernama ```migration``` didalam folder anda
2. Buat sebuah file dengan nama ```1_CreateBase.php``` (nama bisa desuaikan). Setiap nama yang dibuat wajib diawali dengan  angka dan dipisahkan dengan "_" (garis bawah) misalnya ```2_ModifyColumn.php``` dst. Pemberi nomor bertujuan untuk mengurutkan proses migrasi dari awal hingga akhir dan nama setelah nomor tidak boleh ada yang sama.
3. Buka file yang sudah anda buat lalu isinya sebagai berikut:
    ```php
    <?php
    use SLiMS\Migration\Migration;

    class CreateBase extends Migration
    {
        function up() {
            // tulis disini
        }

        function down() {
            // tulis disini
        }
    }
    ```
    #### Penjelasan
    ##### Up
    ```php
    function up()
    ```
    Metoda/method ini akan dijalan ketika plugin diaktifkan. Anda dapat meletakan proses pembuatan tabel,kolom dll yang berkaitan dengan struktur basis data SLiMS yang hendak anda ubah.
    ##### Down
    ```php
    function down()
    ```
    Kebalikan dari metoda seblumnya. Proses yang bisa anda lakukab seperti menghapus struktur tabel, tabel, kolom dll.
### Simpulan
Anda dapat menulis *query* untuk melakukan proses migrasi dengan pustaka yang sudah disedikan oleh SLiMS seperti [```SLiMS\DB```](/development-guide/Database/Penggunaan) contoh:
```php
function up() {
    \SLiMS\DB::getInstance()->query(<<<SQL
    CREATE TABLE IF NOT EXISTS `test` {
        id int,
        nama varchar(255),
        nama_akhir varchar(255)
    }
    SQL);
}
```
