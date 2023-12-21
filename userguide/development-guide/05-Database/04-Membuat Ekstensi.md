Apabila anda memiliki ide atau gagasan lain mengenai cara mengambil data dari *database*
dengan menggunakan pustaka ```SLiMS\DB``` sesuai gaya anda, SLiMS memfasilitasi hal tersebut dengan fitur ini sebagai contoh mengintegrasikan dengan [Laravel Database Query Builder](https://laravel.com/docs/queries).

### Langkah-langkah
Perihal modifikasi, SLiMS hadir dengan [sistem plugin](/development-guide/Plugin/Intro), maka ekstensi yang akan anda buat juga tidak akan lepas dari sistem tersebut agar perubahan yang dibuat tersenteralisasi di satu tempat yaitu direktori ```plugins/``` maka anda perlu belajar membuat plugin dulu, setelah anda paham bagaimana membuat plugin di SLiMS berikut langkah nya membuat ekstensi:
#### 1. Pasang/*install* pustaka illuminate/database menggunakan composer.
Buat plugin anda seperti yang sudah dijelaskan pada [materi sebelumnya](/development-guide/Plugin/Intro).
#### 2. Pasang/*install* pustaka illuminate/database menggunakan composer.
```bash
composer require illuminate/database 
```  
#### 3. Membuat file ekstensi database.
buat file Builder.php pada folder plugin yang sudah anda buat.
#### 4. Isi dari file Builder.php
```php
<?php
use Illuminate\Database\Capsule\Manager;

class Builder extends Manager
{
    public function __construct()
    {
        parent::__construct();
        $database = config('database');
        $defaultDatabase = $database['default_profile'];

        foreach ($database['nodes'] as $name => $detail) {
            if (!isset($detail['driver'])) $detail['driver'] = 'mysql';
            unset($detail['options']);

            $this->addConnection($detail, $name === $defaultDatabase ? 'default' : $name);
        }

        $this->setAsGlobal();
    }
}
```
#### 5. Mendafarkan ekstensi
Buka file ```.plugin.php``` pada folder plugin anda, lalu tambah skrip sebagai berikut:
```php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/Builder.php';

\SLiMS\DB::registerExtension(name: 'builder', class: Builder::class);
```

#### 6. Aktifkan Plugin pada modul sistem

### Cara menggunakan
Petunjuk detail penggunaannya dapat anda lihat pada [dokumentasi resminya](https://laravel.com/docs/queries). Berikut cara menggunakan ekstensi yang anda buat:
```php
<?php
use SLiMS\DB;
$builder = DB::builder();
$biblio = $builder->table('biblio')->limit(10)->get();
$item = $builder->table('item')->select('biblio_id','item_code')->where('biblio_id', 1)->get();
```
### Simpulan
dengan kemampuan ini anda dapat variasi-varias mengenai database secara global dapat diakses dari banyak file di SLiMS melalui ```DB::class```