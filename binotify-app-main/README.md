# (TUBES 2) Adoribu - Comprehensive Collection of ~~Ado's~~ Music
## Kelanjutan dari Tugas Besar 1 IF3110 - Monolithic PHP & Vanilla Web Application

### **Perubahan untuk Tubes 2**
- Tambahan *table* `Subscription` yang tersinkronisasi dengan [SOAP Service](https://gitlab.informatika.org/if3110-2022-k01-02-25/binotify-soap-service) via callback
- Tambahan list penyanyi premium dan list lagu premium


### Deskripsi aplikasi web

Aplikasi web pemutar musik sederhana yang dibangun murni menggunakan HTML, CSS, JS untuk *frontend*, PHP untuk *backend*, dan PostgreSQL untuk *database*. serta dibungkus dalam suatu *container* Docker. 

Fitur-fitur:
- Autentikasi (Login, Register, Logout)
- Pengelolaan album dan musik untuk Admin
- Fitur memutar musik (*play*, *pause*, *seek*, *volume*, *next song*, *previous song*) untuk User dan Admin
- Fitur pencarian (judul, penyanyi, album), termasuk pengurutan berdasarkan judul dan/atau tanggal terbit, filter berdasarkan genre
- *Pagination* untuk daftar lagu
- *Navigation Bar* di setiap page
- Memanfaatkan *Responsive Web Design*
- *Containerized* menggunakan Docker

### Daftar requirement

- [Docker](https://www.docker.com/ "Docker Homepage")
- [PHP](https://www.php.net/ "PHP Homepage")
- [PostgreSQL](https://www.postgresql.org/ "PostgreSQL Homepage")
- Koneksi *internet* untuk men-*download* *requirement*


### Cara instalasi

#### Windows
- Pastikan perangkat telah terkoneksi ke *internet*
- *Install* terlebih dahulu keseluruhan *requirement* yang perlu di-*install*;
- `git pull` repositori ini ke dalam direktori lokal;
- Jalankan `build-image.sh` yang terletak pada direktori `/src/scripts/`.

#### Linux
Setelah `git pull`, Jalankan perintah-perintah berikut di *terminal*:
```
tugas-besar-1$ sudo docker compose down -v
tugas-besar-1$ sudo chmod +x ./scripts/build-image.sh
tugas-besar-1$ sudo ./scripts/build-image.sh
tugas-besar-1$ sudo docker exec -it tubes-1-server /bin/sh
# chmod -R 777 /var/www/html/assets/img
# chmod -R 777 /var/www/html/assets/audio
# exit
tugas-besar-1$ sudo docker exec -it tubes-1-fpm /bin/sh
# chmod -R 777 /var/www/html/assets/img
# chmod -R 777 /var/www/html/assets/audio
# exit
```

### Cara menjalankan server

#### Windows
Jalankan `build-image.sh`. Jika sudah pernah melakukan *build*, cukup buka *terminal* di direktori *root* dan panggil perintah `docker compose up -d`.

#### Linux
Jalankan perintah-perintah berikut untuk menjalankan server.
```
sudo docker compose down -v
sudo chmod +x ./scripts/build-image.sh
sudo ./scripts/build-image.sh
```

### Screenshot tampilan aplikasi
![ss](/screenshots/unknown%20(1).png)

### Pembagian Tugas Anggota

#### Server Side
Register: 13520003
- Login: 13520020
- Home: 13520157
- Search, Sort, Filter: 13520157
- Player: 13520003
- Song: 13520020
- Album: 13520020
- User: 13520003
- Database Queries: 13520003

#### Client Side
- Register: 13520003
- Login: 13520020
- Home: 13520157
- Search, Sort, Filter: 13520157
- Player: 13520003
- Song: 13520020
- Album: 13520020
- User: 13520003
- UI/UX Design: 13520157