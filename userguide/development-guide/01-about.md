# Preambul
### Pengantar
Halaman ini berisi dokumentasi untuk membangun SLiMS anda menjadi seperti apa yang anda inginkan, seperti membuat datagrid, reportgrid, grid yang dapat di cetak dan formulr melalui sistem plugin secara native atau berbasis composer

### Memulai
Prasyarat:
* XAMPP/LAMPP/MAMPP/etc.
* PHP 8.1 atau lebih tinggi
* MySQL 5.7 atau lebih tinggi | MariaDB 10.3 atau lebih tinggi
* Code Editor : VSCode | VSCodium | Sublime | dll
* [SLiMS](https://github.com/slims/slims9_bulian/releases) terbaru atau menggunakan versi [SLiMS Develop](https://github.com/slims/slims9_bulian/tree/develop) (jika anda ingin fitur terbaru sembari mengetes fitur tersebut anda disarankan menggunakan versi develop).

### Mengubah *Environment* / lingkungan
Tahap ini penting karena tanpa merubah *environment* dari *prodcution* ke *development* maka kita tidak tahu pesan *error* yang terjadi ketika melakukan *development* pada SLiMS kita. Berikut langkahnya:
1. Buka modul ``` system ``` lalu pilih menu ``` System Environment Setting ``` / Setelan Lingkungan Sistem
2. Maka akan muncul sebagai berikut: ![contoh](/img/plugin-01-env-change.png)
3. Ubah nilai ``` production ``` ke ``` development ``` lalu klik **Save Settings** /  Simpan Pengaturan.
4. Jika langkah ke 3 berhasil maka muncul seperti berikut:
![dev_criteria](/img/plugin-01-intro-env-save-criteria.png)
setiap modul di SLiMS jika menggunakan *datagrid/form maker* maka akan muncul kotak yang ditandai merah seperti diatas. Kegunaan dari box tersebut yaitu untuk melihat proses/error apa yang terjadi karena secara bawaan proses penyimpanan dilemparkan ke elemen ```<iframe></iframe>```
