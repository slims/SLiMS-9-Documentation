---
title: Menginstall MariaDB
description: ok
image: https://static.slims.web.id/docs/helpers.png
---
Aplikasi ini digunakan untuk menyimpan data-data yang diolah oleh SLiMS. Minimal versi yang digunakan yaitu ```10.3.x```. Kali ini kita akan coba memasang aplikasi ini di distro GNU/Linux yang populer digunakan yaitu Debian11/Ubuntu 22.04 LTS.

### Langkah-langkah pemasangan
1. Masuk ke dalam sistem operasi anda
2. Install paket ```mariadb-server``` dengan perintah berikut:
```bash
sudo apt install mariadb-server -y
```
3. Setelah proses instalasi berhasil masuk ke dalam ```shell``` dari Mariadb dengan perintah berikut:
```bash
sudo mariadb -u root
```
4. Membuat user khusus untuk aplikasi SLiMS
```sql
-- ganti kata slims dengan nama basis data yang anda inginkan
create database slims;

-- setelah itu membuat user yang akan 
-- menggunakan database tersebut
create user slims;

-- memberikan perizinan ke user slims agar 
-- dapat mengakses dan mengelola database 
-- slims dari localhost dengan password secret
grant all privileges on slims.* to 'slims'@'localhost' identified by 'secret';

-- Apabila database slims ingin diakses 
-- dari jaringan lain maka perlu 
-- menuliskan skrip sebagai berikut
grant all privileges on slims.* to 'slims'@'%' identified by 'secret';

-- Memperbaharui data privileges pada mariadb
flush privileges;
```

5. Mengatur agar MariaDB dapat di akses dari berbagai jaringan (opsional)

Kebutuhan akan pertukuran data menggunakan ```computer network/TCP Ip``` membuat kita sebagai pengelola *server* untuk membuka akses ke database kita. Buka file 50-server.cnf
```bash
nano /etc/mysql/mariadb.conf.d/50-server.cnf
```
isi file 50-server.cnf
```conf
# ketika file sudah terbuka ubah nilai dibawah berikut:
bind-address            = 127.0.0.1

# ke 
bind-address            = 0.0.0.0

# tekan Ctrl+O untuk menyimpan dan Ctrl+X untuk keluar dari editor
```
restart aplikasi mariadb
```bash
sudo systemctl restart mariadb
```
:::danger
Poin ke 5 sangat berisiko apabila ```server mariadb``` dapat diakses dari internet secara langsung tanpa pengamanan (*firewall*). Bijaklah untuk mengelola akses ke server anda.
:::
