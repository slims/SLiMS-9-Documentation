---
title: Penggunaan
description: Pustaka ini berkaitan dengan konfigurasi file pada config/cache.php, secara bawaan akan menggunakan salah satu "Provider" yang tercantum pada opsi "default". Provider yang tersedia yaitu...
image: https://static.slims.web.id/docs/8.1-cache.png
---
Pustaka ini berkaitan dengan konfigurasi file pada config/cache.php, secara bawaan akan menggunakan salah satu "Provider" yang tercantum pada opsi "default". Provider yang tersedia yaitu **Files** dan **Database**. Berikut ringkasan penggunaannya :

## Metoda yang tersedia (Pada Provider Files dan Database)
### Membuat cache baru
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 * contents @string|integer|array|objek 
 * yang nanti akan disimpan dalam format JSON
 */
Cache::set(cacheName: 'namacache', 'content');
```

### Mengambil cache yang sudah ada
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 * callBack @closure optional 
 */
Cache::get(cacheName: 'namacache', callBack: 'fungsi_kustom_anda');
```

### Memperbaharui cache yang sudah ada
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 * contents @string|integer|array|objek 
 * yang nanti akan disimpan dalam format JSON
 */
Cache::put(cacheName: 'namacache', contents: 'content');
```

### Menghapus cache yang sudah ada
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 */
Cache::destroy(cacheName: 'namacache');
```

### Mengkosongkan|Menghapus semua cache
```php
<?php
use SLiMS\Cache;

Cache::purge();
```

### Menampilkan semua cache yang tersimpan
```php
<?php
use SLiMS\Cache;

Cache::getList();
```

### Mengecek eksistensi cache
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 */
Cache::isExists(cacheName: 'namacache');
```

## Metoda yang hanya tersedia di Provider Database
### Mengecek apakah cache sudah kedaluwarsa
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 * terkait pengaturan/opsi kedaluwarsa nya anda
 * dapat melihat nya di config/cache.php pada 
 * providers database
 */
Cache::isExpire(cacheName: 'namacache');
```

### Mengupdate cache jika sudah kedaluwarsa
```php
<?php
use SLiMS\Cache;

/**
 * cacheName @string
 * contents @string|integer|array|objek 
 * 
 * sama dengan metoda Cache::put hanya saja ini
 * dikombinasikan dengan pengecak kedaluwarsa.
 */
Cache::putIfExpire(cacheName: 'namacache', contents: 'content');
```