# Binotify REST Service

## Deskripsi Service

REST Service API untuk melakukan manajemen lagu premium oleh user (penyanyi). API dibangun menggunakan NodeJS untuk implementasi REST, dan PostgreSQL untuk *database*, serta di-*containerize* dengan Docker.

## Features
- **Skema Database** menggunakan [PostgreSQL](https://www.postgresql.org/)
- **Authentikasi** dengan [JWT](https://jwt.io/)
- **Terintegrasi** dengan [SOAP Service](https://gitlab.informatika.org/if3110-2022-k01-02-25/binotify-soap-service)
- **Kontainerisasi** dengan [Docker](https://www.docker.com/ "Docker Homepage").
- **Endpoints** (dari http://localhost:3001/api, semua *Request* dan *Response* berformat JSON)

Endpoints         | Method | Description
---               | ---    | ---
`/register`       | POST   | *Register* pengguna
`/login `         | POST   | *Login* pengguna
`/getUsers`       | GET    | Mengembalikan daftar keseluruhan pengguna
`/getSongs`       | GET    | Mengembalikan daftar lagu premium milik penyanyi
`/addSong`        | POST   | Menambahkan lagu premium dari penyanyi
`/updateSong`     | POST   | Menyunting atribut lagu (judul dan *path* menuju *file audio* lagu)
`/removeSong`     | POST   | Menghapus lagu premium milik penyanyi
`/getSubRequests` | GET    | (SOAP) Mengembalikan daftar *request subscribe* penyanyi dari pengguna
`/updateSub`      | POST   | (SOAP) Memperbarui status *subscription* dari pengguna
`/getPremiumSongs`| GET    | (SOAP) Mengembalikan daftar lagu premium dari penyanyi yang diikuti pengguna


## Pembagian Tugas
0. Readme ini: **13520003**
1. Setup, Routing: **13520003**
2. Fungsi Kredensial (*register, login*): **13520003**
3. Fungsi *CRUD* pada lagu milik pengguna: **13520003** 
4. SOAP Service untuk fungsi administrasi (`/getSubRequests`, `/updateSub`): **13520003**
5. SOAP Service mengembalikan daftar lagu premium (`/getPremiumSongs`): **13520003**
6. Database: **13520003**, **13520157**
7. Dockerize: **13520003**, **13520157** 
8. Integrasi Keseluruhan: **13520157**