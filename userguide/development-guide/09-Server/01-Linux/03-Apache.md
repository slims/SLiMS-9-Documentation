---
title: Mengkonfigurasi VirtualHost di Apache2
description: Masuk ke dalam sistem operasi Debian/Ubuntu anda
image: https://static.slims.web.id/docs/9.1.3-apache2.png
---
### Pada distro Debian dan variannya
1. Masuk ke dalam sistem operasi Debian/Ubuntu anda.
2. Mengaktifkan modul apache rewrite
```bash
sudo a2enmod rewrite
```
3. Mengatur VirtualHost
```bash
# masuk ke dalam file konfigurasi VirtualHost
sudo nano /etc/apache2/sites-available/000-default.conf
```
4. Sesuaikan isi file tersebut dengan skrip dibawah ini:
```conf
<VirtualHost *:80>
    # The ServerName directive sets the request scheme, hostname and port that
    # the server uses to identify itself. This is used when creating
    # redirection URLs. In the context of virtual hosts, the ServerName
    # specifies what hostname must appear in the request's Host: header to
    # match this virtual host. For the default virtual host (this file) this
    # value is not decisive as it is used as a last resort host regardless.
    # However, you must set it for any further virtual host explicitly.
    #ServerName www.example.com

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/slims9_bulian

    # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
    # error, crit, alert, emerg.
    # It is also possible to configure the loglevel for particular
    # modules, e.g.
    #LogLevel info ssl:warn

    <Directory /var/www/html/slims9_bulian>
        AllowOverride All
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # For most configuration files from conf-available/, which are
    # enabled or disabled at a global level, it is possible to
    # include a line for only one particular virtual host. For example the
    # following line enables the CGI configuration for this host only
    # after it has been globally disabled with "a2disconf".
    #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
```
5. Keluar dengan menekan kombinasi tombol ```Ctrl + O``` untuk menyimpan dan ```Ctrl + X``` untuk keluar dari editor nano.
