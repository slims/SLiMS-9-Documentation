---
title: Mengunduh dan mengatur perizinan source code SLiMS pada distro Debian 11/Ubuntu 22.04 LTS
description: ok
image: https://static.slims.web.id/docs/helpers.png
---
1. Masuk ke dalam direktori ```/var/www/html/``` dengan perintah berikut:
```bash
cd /var/www/html/
```
2. Merubah *owner* dari direktori pada poin 7 dengan perintah berikut:
```bash
sudo chown $UID -R ./
# perintah diatas digunakan agar anda dapat mengubah isi file
# yang ada di SLiMS.
```
3. Mengunduh *source code* SLiMS dari github dengan perintah ```git```
```bash
git clone https://github.com/slims/slims9_bulian

# Berikutnya anda perlu mengatur permission beberapa direktori
# yang digunakan untuk menyimpan file yang diunggah oleh pengguna
# seperti repository/ files/ images/ dan config/
sudo chown www-data:www-data -R ./slims9_bulian/{config/,files/,images/,repository/}
```