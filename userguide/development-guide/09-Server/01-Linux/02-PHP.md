---
title: Menginstall PHP
description: ok
image: https://static.slims.web.id/docs/helpers.png
---
### PHP 8.1 pada Distro Debian 11 dan Ubuntu 22.04 LTS
1. Masuk ke dalam sistem operasi Debian/Ubuntu anda.
```bash
sudo apt update

# khusus untuk Debian 11 perlu menambahkan repository eksternal
# agar versi PHP yang diinstall bisa menggunakan versi 8.1, jika anda
# menggunakan Ubuntu tidak perlu melakukan ini langsung ke poin ke 2

# memasang aplikasi yang dibutuhkan
sudo apt install ca-certificates apt-transport-https software-properties-common -y

# menambahkan alamat repository
sudo su -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/sury-php.list'

# Menambahkan kunci GPG
wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -

# tulisan diatas dikutip dari sumber : https://www.linuxtuto.com/how-to-install-php-8-1-on-debian-11/

# mengupdate data repository pada sistem
sudo apt update
```
2. Meng-*install* aplikasi pendukung seperti Git, Apache2/Nginx, PHP dan beserta modul pendukungnya.

    * **Pada [Apache2](./Apache)**
      ```bash
      sudo apt install -y apache2 git libapache2-mod-php8.1 php8.1-mysql php8.1-gd php8.1-gettext php8.1-mbstring php8.1-intl php8.1-xml php8.1-zip
      ```
    * **Pada [Nginx](./Nginx)**
      ```bash
      sudo apt install -y nginx git php8.1 php8.1-fpm php8.1-mysql php8.1-gd php8.1-gettext php8.1-mbstring php8.1-intl php8.1-xml php8.1-zip

      # Menyalakan service php8.1-fpm
      sudo systemctl start php8.1-fpm
      ```
3. 