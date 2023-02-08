# Binotify SOAP Service

## Deskripsi Service

SOAP Service API untuk melakukan manajemen *subscription* pengguna dan penyanyi. API dibangun menggunakan JAX-WS untuk implementasi SOAP, dan MySQL untuk *database*, serta di-*containerize* dengan Docker.

## Features
- **Skema Database** menggunakan [MySQL](https://www.mysql.com/)
- **Implementasi** *security* menggunakan skema *API-key*
- Fitur ***logging*** seluruh *request* menuju SOAP Service ini
- **Terintegrasi** dengan [REST Service](https://gitlab.informatika.org/if3110-2022-k01-02-25/binotify-rest-service)
- **Callback** menuju [Binotify App](https://gitlab.informatika.org/if3110-2022-k01-02-25/binotify-app) melalui REST Service
- **Kontainerisasi** dengan [Docker](https://www.docker.com/ "Docker Homepage")
- **Endpoints** (dari http://localhost:2434/)

| Endpoints          | Method | Description                                |
|--------------------|--------|--------------------------------------------|
| `/callback`        | POST   | Implementasi callback dari Binotify App    |
| `/subscription `   | POST   | Implementasi fungsionalitas *subscription* |

## Pembagian Tugas
0. Readme ini: **13520003**
1. Setup, routing, database, dockerize: **13520157**
2. Fungsi logging: **13520157**
3. Fungsi callback: **13520157**
4. Fungsi *subscription* (`subscribe`, `getSub`, `updateSub`): **13520157**
5. Integrasi dengan REST Service: **13520003**
6. Integrasi keseluruhan: **13520157**