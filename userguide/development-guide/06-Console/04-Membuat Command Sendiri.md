---
title: Membuat Command Anda Sendiri
description: Command meruapakan bagian dari fitur ```console``` yang berbentuk program yang berisi perintah-perintah yang digunakan untuk menyelesaikan pekerjaan tertentu yang berjalan di lingkungan antarmuka baris perintah / Command Line Interface...
image: https://static.slims.web.id/docs/6.4-praktek.png
---
*Command* meruapakan bagian dari fitur ```console``` yang berbentuk program yang berisi perintah-perintah yang digunakan untuk menyelesaikan pekerjaan tertentu yang berjalan di lingkungan antarmuka baris perintah / *Command Line Interface*. Secara bawaan SLiMS sudah hadir dengan *Command* seperti *backup database*,*Plugin Info*,*SLiMS Info*, dan *Command Maker*. Pada laman ini akan dibahas bagaimana membuat *Command* anda sendiri.
### Langkah-Langkah
1. Siapkan terminal anda terlebih dahulu, lalu  masuk ke dalam direktori SLiMS
    ```bash
    cd direktori/slims/anda/
    ```
2. Lalu ketik perintah sebagai berikut:
    ```bash
    php tarsius make:command MailOverdue
    ```
    baris perintah diatas akan memberitahu SLiMS untuk membuat sebuah *Command* yang bernama Mail.php yang nanti akan tersimpan di direktori ```plugins/Commands/```.
3. Buka file Mail.php pada folder ```plugins/Commands```. Maka anda kan melihat skrip sebagai berikut:
    ```php
    <?php
    namespace Commands;

    use SLiMS\Cli\Command;

    class MailOverdue extends Command
    {
        /**
         * Signature is combination of command name
         * argument and options
         *
         * @var string
         */
        protected string $signature = 'command:name';

        /**
         * Command description
         *
         * @var string
         */
        protected string $description = 'Command description';

        /**
         * Handle command process
         *
         * @return void
         */
        public function handle()
        {
            // write your code here
        }
    } 
    ```
    Penjelasan:
    #### Nama objek
    ```php
    class MailOverdue extends Command
    ```
    Kata ```MailOverdue``` berasal dari nama yang anda tulis pada langkah ke 2
    #### Signature
    ```php
    protected string $signature = 'command:name';
    ```
    ini merupakan ciri khas dari *command* yang anda buat. Maka anda bisa mengganti nya menjadi yang lain. Contohnya
    ```php
    protected string $signature = 'mail:overdue';
    ```
    *signature* dapat berbentuk kata tunggal atau lebih. Jika anda membuat signature dengan lebih dari satu maka anda perlu memisahkannya dengan tanda ":" (titik dua) seperti diatas. Penggunan karakter pemisah disini digunakan untuk memberitahu SLiMS bahwa anda membuat *Command* yang topik nya sama namun tugas nya berbeda-beda contoh :

    ![SLiMS Console](/img/console-command-group.png)

    Pada gambar diatas anda dapat melihat terdapat *Command* yang sama yaitu ```db``` namun memiliki tugas yang berbeda.
    #### Description
    ```php
    protected string $description = 'Command description';
    ```
    Ini merupakan kalimat deskripsi untuk *Command* anda yang bertujuan untuk menginformasikan ke pada anda/pengguna lain mengenai cara kerjanya. Dapat anda rubah misalkan seperti berikut:
    ```php
    protected string $description = 'Untuk mengirim email keterlambatan peminjaman anggota';
    ```
    #### Handle
    ```php
    public function handle()
    {
        // write your code here
    }
    ```
    Bagian ini merupakan tempat dimana anda meletakan segala macam proses yang akan anda lakukan, karena pada contoh ini anda membuat *Command* yang berkaitan dengan *E-Mail* maka anda dapat memanfaatkan pustaka ```\SLiMS\Mail``` yang ada di SLiMS.
### Implementasi
```bash
php tarsius mail:overdue
```