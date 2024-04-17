---
title: Ekstensi Database
description: Fitur ini merupakan bagian dari pustaka SLiMS\DB yang membantu anda dalam mengelola data yang hendak diambil dari database, anda dapat menggunakan ekstensi bawaan dari SLiMS yaitu SLiMS\Query untuk mengambil data berdasarkan kueri yang anda tulis....
image: https://static.slims.web.id/docs/5.3-ekstensi.png
keywords: [database slins, konfigurasi database di SLiMS]
---
Fitur ini merupakan bagian dari pustaka ```SLiMS\DB``` yang membantu anda dalam mengelola data yang hendak diambil dari *database*, anda dapat menggunakan ekstensi bawaan dari SLiMS yaitu ```SLiMS\Query``` untuk mengambil data berdasarkan kueri yang anda tulis.

## Query
Ekstensi ini memanfaatkan **PDO** sebagai media untuk berinteraksi dengan *database*.

### Penggunaan
```php
use SLiMS\DB;

// penulisan dasar
$biblio = DB::query('select * from biblio');

foreach($biblio as $data) {
    echo $data['biblio_id'] . ' : ' . $data['title'] . PHP_EOL;
}
```
atau jika anda hendak mengimplementasikan beberapa masukan seperti $_POST|$_GET.
```php
$biblio = DB::query('select * from biblio where biblio_id = ?', [$_POST['id']]);
```
skrip diatas menerapkan ```PDOStatement``` sebelum data diproses.

### Opsi
Beberapa opsi yang dapat digunakan yaitu:
1. ``` setConnection ``` : mengatur profil koneksi yang akan digunakan
2. ``` setDefaultOutput ``` : mengatur tipe data yang di olah seperti PDO::FETCH_OBJ dll (bawaan : PDO::FETCH_ASSOC);
3. ``` first ``` : mengambil data pertama
3. ``` last ``` : mengambil data terakhir

#### Mengatur koneksi
lihat pada [referensi sebelumnya](Penggunaan#menganti-koneksi) mengenai manajemen koneksi
```php
$biblio->setConnection('non-default');
```

#### Mengatur keluaran sebagai objek
```php
$biblio->setDefaultOutput(PDO::FETCH_OBJ);
```