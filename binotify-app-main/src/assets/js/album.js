class AlbumJS {
    constructor() {
        this.edit_entry = document.querySelector(".edit-album-btn")
        this.cancel_edit_btn = document.querySelector(".cancel-edit-btn")
        this.add_song_icon = document.querySelector(".add-song-icon")
        this.details = document.querySelector('#modifiable-wrapper');
        this.img = document.querySelector('.album-cover-img img');
        this.delete_button = document.querySelector('input[name="delete"]');
        this.save_button = document.querySelector('input[name="save"]');
        this.song_out = document.querySelector('.song-out');
        this.album_id = document.querySelector('#album-id').value;
        // INPUT
        this.album_judul = document.querySelector('input[name="judul"]');
        this.album_artist = document.querySelector('input[name="artist"]');
        this.album_tanggal_terbit = document.querySelector('input[name="release-date"]');
        this.album_cover_img = document.querySelector('#album-cover-upload');
        this.album_genre = document.querySelector('input[name="genre"]');
        this.album_genre_list = document.querySelector('#genre-opt');
        this.song_choice = document.querySelector('#song-add-choice');
        this.song_choice_hidden = document.querySelector('#song-add-choice-hidden');
        // MSG
        this.album_filename = document.querySelector('#album-filename span');

    }
    fancyTimeFormat(duration){   
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    toggleEdit() {
        document.querySelector(".album-details").classList.toggle("display-none")
        document.querySelector(".edit-album").classList.toggle("display-none")
    }

    toggleAddSong() {
        document.querySelector(".add-song-panel").classList.toggle("display-none")
    }
    fetchAllGenre() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8008/process/get_info.php?type=genre", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let parsed = JSON.parse(xhr.responseText).result;
                for (let i = 0; i < parsed.length; i++) {
                    this.album_genre_list.innerHTML += `<option value="${parsed[i].genre == null ? 'Unknown' : parsed[i].genre}"></option>`
                }
            }
        }
        xhr.send(null);
    }
    fetchAllSong() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8008/process/get_info.php?type=song_not_in_album&album_id=" + this.album_id, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let parsed = JSON.parse(xhr.responseText).result;
                for (let i = 0; i < parsed.length; i++) {
                    let datalist = document.querySelector('#song-list-opt');
                    datalist.innerHTML += `<option value="${parsed[i].song_id}"> ${parsed[i].judul}</option>`
                }
            }
        }
        xhr.send(null);
    }
    fetchAlbum() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8008/process/album_backend.php?id=" + this.album_id, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let album = JSON.parse(xhr.responseText).result[0];
                this.img.src = album.image_path;
                this.details.innerHTML = `
                    <h1 class="section-title">${album.judul}</h1>
                    <span>${album.penyanyi}</span>
                    <span>${this.fancyTimeFormat(album.total_duration)}</span>
                    <span>${album.tanggal_terbit}</span>
                    <span>${album.genre == null || album.genre == '' ? "Unknown" : album.genre}</span>
                `
                this.album_judul.value = album.judul;
                this.album_artist.value = album.penyanyi;
                this.album_genre.value = album.genre == null ? "Unknown" : album.genre;
                this.album_tanggal_terbit.value = album.tanggal_terbit;
                this.album_filename.innerHTML = album.image_path.split("/").pop();
            }
        }
        xhr.send(null);
    }
    fetchSongInAlbum() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8008/process/get_info.php?type=song_in_album&album_id=" + this.album_id, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let parsed = JSON.parse(xhr.responseText).result;
                let xhr2 = new XMLHttpRequest();
                xhr2.open('GET', 'http://localhost:8008/components/list-display.php' + "?type=song&json=" +  JSON.stringify(parsed), true);
                xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr2.onreadystatechange = () => {
                    if (xhr2.status === 200 && xhr2.readyState === 4) {
                        this.song_out.innerHTML = xhr2.responseText;
                    }
                }
                xhr2.send(null);
            }
        }
        xhr.send(null);
    }

    run() {
        this.fetchAllSong();
        this.fetchAllGenre();
        this.song_choice.addEventListener('input', (e) => {
            var input = e.target,   
            list = input.getAttribute('list'),
            options = document.querySelectorAll('#' + list + ' option[value="'+input.value+'"]'),
            hiddenInput = document.getElementById(input.getAttribute('id') + '-hidden');
            if (options.length > 0) {
                hiddenInput.value = input.value;
                input.value = options[0].innerText;
            }
        });
        document.querySelector('.add-song-btn').addEventListener('click', () => {
            let form = new FormData();
            form.append('song_id', this.song_choice_hidden.value);
            form.append('album_id', this.album_id);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', "http://localhost:8008/process/album_backend.php", true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    this.fetchSongInAlbum();
                    this.fetchAlbum();
                }
            }
            xhr.send(`song_id=${this.song_choice_hidden.value}&album_id=${this.album_id}`);
        });

        this.edit_entry.addEventListener("click", this.toggleEdit)
        this.cancel_edit_btn.addEventListener("click", this.toggleEdit)
        this.add_song_icon.addEventListener("click", this.toggleAddSong)
        this.fetchAlbum();

        this.delete_button.addEventListener('click', (e) => {
            e.preventDefault();
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8008/process/album_backend.php", true);
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200){ 
                    console.log(this.responseText);
                    window.location.href = "http://localhost:8008/index.php";
                }
            }

            var form = new FormData();
            form.append("id_delete", this.album_id);
            xhttp.send(form);
        });
        this.fetchSongInAlbum();
        this.save_button.addEventListener('click', (e) => {
            e.preventDefault();
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8008/process/album_backend.php", true);
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200){ 
                    console.log(this.responseText);
                }
            }
            var form2 = new FormData();
            form2.append("id", this.album_id);
            form2.append("judul", this.album_judul.value);
            form2.append("tanggal_terbit", this.album_tanggal_terbit.value);
            form2.append("genre", this.album_genre.value);
            console.log(this.album_cover_img)
            if (this.album_cover_img.files.length > 0) {
                form2.append("image", this.album_cover_img.files[0]);
            }

            xhttp.send(form2);
        });
    }
}

const albumJS = new AlbumJS();
albumJS.run();