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