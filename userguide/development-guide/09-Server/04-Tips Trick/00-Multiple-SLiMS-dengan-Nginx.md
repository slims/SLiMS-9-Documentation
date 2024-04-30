---
title: Multiple SLiMS dengan Nginx
description: Bawa SLiMS anda ke ranah enterprise...
image: https://static.slims.web.id/docs/9.1.5-source-code.png
---
<img src="https://static.slims.web.id/docs/tips-trick-1.png"/>

SLiMS dapat dikonfigurasi untuk dapat bekerja dengan ***mode multiservice***, dimana semua layanan itu memiliki ketergantungan pustaka yang berbeda dan harus dipisahkan untuk tiap layanannya. Contoh: layanan OPAC menggunakan SLiMS 9 Bulian yang membutuhkan PHP 8.1 dan layanan /repository menggunakan SLiMS 7 Cendana yang membutuhkan PHP 5.6, dari contoh itu mudah untuk diterapkan di cPanel. Namun, bagaimana jika ada pustaka yang dibutuhkan tiap layanan tidak bisa di sediakan oleh cPanel? cukup repot bukan?. Biasanya pemisahan diimplemtasikan dengan pendekatan Virtual Server seperti [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine) dan [Container](https://en.wikipedia.org/wiki/Containerization_(computing)) serta disatukan dalam sebuah domain (perpustakaan.com)
Contoh:
```
perpustakaan.com/opac/
perpustakaan.com/repository/
perpustakaan.com/gallery/
```
Pada Nginx sangat mudah untuk