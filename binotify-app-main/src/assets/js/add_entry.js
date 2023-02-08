class AddEntryJS {
    constructor() {
        this.xhttp = new XMLHttpRequest();
        this.select_option = document.querySelector("#select-type")
        this.form_album = document.querySelector(".form-album")
        this.form_song = document.querySelector(".form-song")
        this.submit_button_album = this.form_album.querySelector("input[name='submit-btn']")
        this.submit_button_song = this.form_song.querySelector("input[name='submit-btn']")

        this.judul_album = this.form_album.querySelector("input[name='judul_album']")
        this.penyanyi_album = this.form_album.querySelector("input[name='penyanyi_album']")
        this.release_date = this.form_album.querySelector("input[name='release-date']")
        this.genre_album = this.form_album.querySelector("input[name='genre_album']")
        this.album_cover_upload = this.form_album.querySelector("input[name='album_cover_upload']")

        this.judul_lagu = this.form_song.querySelector("input[name='judul_lagu']")
        this.penyanyi_lagu = this.form_song.querySelector("input[name='penyanyi_lagu']")
        this.release_date_lagu = this.form_song.querySelector("input[name='release-date-lagu']")
        this.genre_lagu = this.form_song.querySelector("input[name='genre_lagu']")
        this.file_lagu = this.form_song.querySelector("input[name='song_audio_upload']")
        this.image_lagu = this.form_song.querySelector("input[name='song_cover_upload']")
        this.form = new FormData();
    } 

    serialize(obj) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }

    run() {
        this.select_option.addEventListener("change", e => {
            e.preventDefault()
            this.form_album.classList.toggle("display-none")
            this.form_song.classList.toggle("display-none")
        })

        this.album_cover_upload.addEventListener("change", e => {
            e.preventDefault()
            document.getElementById("album-file").innerHTML = this.album_cover_upload.files[0].name
        })

        this.file_lagu.addEventListener("change", e => {
            e.preventDefault()
            document.getElementById("song-file").innerHTML = this.file_lagu.files[0].name
        })

        this.image_lagu.addEventListener("change", e => {
            e.preventDefault()
            document.getElementById("song-cover").innerHTML = this.image_lagu.files[0].name
        })

        this.submit_button_album.addEventListener("click", e => {
            e.preventDefault()
            this.xhttp.open("POST", "http://localhost:8008/process/album_backend.php", true);
            this.xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200){ 
                    console.log(this.responseText);
                }
            }

            this.form.append("judul_album", this.judul_album.value);
            this.form.append("penyanyi_album", this.penyanyi_album.value);
            this.form.append("tanggal_terbit_album", this.release_date.value);
            this.form.append("genre_album", this.genre_album.value);
            this.form.append("album_cover_upload", this.album_cover_upload.files[0]);

            this.xhttp.send(this.form);

        })

        this.submit_button_song.addEventListener("click", e => {
            e.preventDefault()
            this.xhttp.open("POST", "http://localhost:8008/process/song_backend.php", true);
            this.xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200){ 
                    console.log(this.responseText);
                }
            }

            this.form.append("judul_lagu", this.judul_lagu.value);
            this.form.append("penyanyi_lagu", this.penyanyi_lagu.value);
            this.form.append("tanggal_terbit_lagu", this.release_date_lagu.value);
            this.form.append("genre_lagu", this.genre_lagu.value);
            this.form.append("file_lagu", this.file_lagu.files[0]);
            if (this.image_lagu.files[0]) {
                this.form.append("image_lagu", this.image_lagu.files[0]);
            }

            this.xhttp.send(this.form);

        })
    }
}

const addEntryJS = new AddEntryJS()
addEntryJS.run()