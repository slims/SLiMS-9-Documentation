---
title: Mengkonfigurasi VirtualHost di Nginx
description: Sesuaikan isi file tersebut dengan skrip dibawah ini...
image: https://static.slims.web.id/docs/9.1.4-nginx.png
---
### Pada distro Debian dan variannya
1. Masuk ke dalam sistem operasi Debian/Ubuntu anda.
2. Mengatur VirtualHost
```bash
# masuk ke dalam file konfigurasi VirtualHost
sudo nano /etc/nginx/sites-available/default

```
3. Sesuaikan isi file tersebut dengan skrip dibawah ini:
```conf
# Mengubah value root path
# dari
root /var/www/html/;

# ke
root /var/www/html/slims9_bulian/;

# Mengubah pemroses PHP yang semula
#location ~ \.php$ {
#       include snippets/fastcgi-php.conf;
#
#       # With php-fpm (or other unix sockets):
#       fastcgi_pass unix:/run/php/php7.4-fpm.sock;
#       # With php-cgi (or other tcp sockets):
#       fastcgi_pass 127.0.0.1:9000;
#}

# menjadi
location ~ \.php$ {
    try_files $uri =404;
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    # fastcgi_pass 127.0.0.1:9000;
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include /etc/nginx/fastcgi.conf;	
}
```
5. opsi ```fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;``` bisa diganti dengan yang diatas nya yaitu ```fastcgi_pass 127.0.0.1:9000;``` bergantung bagaimana paket ```php-fpm``` anda pada server yang digunakan.
6. Keluar dengan menekan kombinasi tombol ```Ctrl + O``` untuk menyimpan dan ```Ctrl + X``` untuk keluar dari editor nano.