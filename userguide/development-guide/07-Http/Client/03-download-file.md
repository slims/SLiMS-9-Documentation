---
title: Download File
description: Dengan menggunakan pustaka SLiMS\Http\Client anda dapat dengan mudah mengunduh sebuah file dari layanan tertentu.....
image: https://static.slims.web.id/docs/7.1.3-download.png
---
# Download File
Dengan menggunakan pustaka ```SLiMS\Http\Client``` anda dapat dengan mudah mengunduh sebuah file dari layanan tertentu.
### Penggunaan
```php
$url = 'https://slims.web.id/web/site/templates/assets/images/logo.png';

Client::download($url)->to(SB . 'images/dummy.png');

// dengan opsi
Client::download($url)->to(SB . 'images/dummy.png', [
    'headers' => [
        'X-Token' => 'aksdjflkajdfiuokljlkqweq'
    ]
]);
```