# Tentang
### Intro
Halaman ini berisi dokumentasi untuk membangun SLiMS anda seperti apa yang anda inginkan, seperti membuat datagrid, reportgrid, grid yang dapat di cetak dan formulr melalui sistem plugin secara native atau berbasis composer

### Memulai
Prasyarat:
* XAMPP/LAMPP/MAMPP/etc.
* PHP 8.1 atau lebih tinggi
* MySQL 5.7 atau lebih tinggi | MariaDB 10.3 atau lebih tinggi
* Code Editor : VSCode | VSCodium | Sublime | dll
* [SLiMS](https://github.com/slims/slims9_bulian/releases) terbaru atau menggunakan versi [SLiMS Develop](https://github.com/slims/slims9_bulian/tree/develop)

### Mengubah *Environment* / lingkungan
Tahap ini penting karena tanpa merubah *environment* dari *prodcution* ke *development* maka kita tidak tahu pesan *error* yang terjadi ketika melakukan *development* pada SLiMS kita. Berikut langkahnya:
1. Buka modul ``` system ``` lalu pilih menu ``` System Environment Setting ``` / Setelan Lingkungan Sistem
2. Maka akan muncul sebagai berikut: ![contoh](/img/plugin-01-env-change.png)
3. Ubah nilai ``` production ``` ke ``` development ``` lalu klik **Save Settings** /  Simpan Pengaturan.
