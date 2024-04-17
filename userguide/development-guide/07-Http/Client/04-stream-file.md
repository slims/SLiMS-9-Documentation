---
title: Stream File
description: Mengambil sumber data dari layanan lain tanpa mengunduh nya.....
image: https://static.slims.web.id/docs/7.1.4-stream-file.png
---
# Stream File
Mengambil sumber data dari layanan lain tanpa mengunduh nya
### Penggunaan
```php
$url = 'https://slims.web.id/web/site/templates/assets/images/logo.png';

Client::stream($url);

// jika dengan opsi lain
Client::stream($url, [
    'headers' => [
        'X-Token' => 'aksdjflkajdfiuokljlkqweq'
    ]
]);
```