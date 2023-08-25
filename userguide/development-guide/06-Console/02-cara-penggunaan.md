---
title: Cara penggunaan
description: Penjelasan teknis terkait cara menggunakan fitur SLIMS console.
image: '/docs/static/img/console-meta-image.png'
---
### Pengantar
Fitur ini membutuhkan antarmuka berbasis perintah atau sering dikenal dengan CLi. Maka anda diwajibkan sudah paham terkait pengguna aplikasi pendukung fitur ini seperti pada Micrsoft Windows: Command Prompt, Windows Terminal atau PowerShell, pada GNU Linux: Terminal, Konsol, dll.

### Langkah memulai
1. Buka konsole anda (Command Prompt dll)
2. Masuk kedalam folder : ``` cd <slims-root>/ ```. Contoh nya ``` cd /var/www/html/slims9_bulian ```
3. ketik : ``` php index.php ```, maka akan muncul keluaran sebagai berikut:

![SLiMS Console](/img/console-meta-image.png)

### Praktik Penggunaan
Terdapat beberapa perintah yang tersedia seperti status, db dan plugins. Berikut ini contoh  cara penggunaannya.

#### Menampilkan status SLiMS

```bash
php index.php status
```

![status](/img/console-06-status.png)

#### Menampilkan daftar plugin yang aktif

```bash
php index.php plugin:list
```

![daftar](/img/console-06-olugin-list.png)

### Penjelasan
format penulisan perintah pada SLiMS Console

``` php index.php [perintah] [opsi]```

Contoh: 

``` php index.php plugin:list --type=all ```

Keterangan
* **php**  : perintah PHP pada konsole anda, php.exe pada sistem operasi windows
* **index.php**   : file yang berisi skrip PHP yang mengelola perintah ``` plugin:list ```
* **plugin:list** : merupakan nama perintah + sub perintah nya. Jadi anda dapat membuat variasi perintah yang saling berkaitan, semisal dalam perntah ```plugin``` anda dapat memecah nya menjadi beberapa sub perintah seperti ```:list```,```:detail```, ```:activate```, dan ```:deactivate``` yang berdiri sendiri namun memiliki nama awalan yang sama yaitu ```plugin```. Namun pemecahan sebuah perintah menjadi sub-perintah tidak lah wajib. Apabila anda ingin perintah yang tunggal tidak perlu menambahkan akhiran seperti yang ada diatas. Contoh nya adalah perintah ```status```.
* **--type=all**  : opsi yang tersedia pada perintah tersebut yang memberitahu bahwa anda meminta daftar plugin secara lengkap menggunakan kriteria plugin yang aktif dan tidak aktif. Karena opsional maka penulisan ini tidak wajib digunakan.