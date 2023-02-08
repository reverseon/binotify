class SongJS {
    constructor() {
        // HOME CONTROL
        this.song_btn = document.querySelector('.edit-song-btn');
        this.edit_song = document.querySelector('.edit-song');
        this.song_id = document.querySelector('#song-id').value;
        // DETAILS
        this.song_details = document.querySelector('.song-details');
        this.details = document.querySelector('#modifiable-wrapper');
        this.img = document.querySelector('.song-cover-img img');
        // INFO
        this.alb_list = document.querySelector('#album-list-opt');
        this.artist_list = document.querySelector('#artist-list-opt');
        this.genre_list = document.querySelector('#genre-list-opt');
        // EDIT CONTROL
        this.delete_button = document.querySelector('input[name="delete"]');
        this.save_button = document.querySelector('input[name="save"]');
        this.cancel_edit_btn = document.querySelector('input[name="cancel"]');
        // ALL INPUT
        this.judul_lagu = document.querySelector('input[name="judul"]');
        this.judul_album = document.querySelector('input[name="album"]');
        this.penyanyi = document.querySelector('input[name="artist"]');
        this.genre_lagu = document.querySelector('input[name="genre"]');
        this.tanggal_terbit_lagu = document.querySelector('input[name="release-date"]');
        this.file_lagu = document.querySelector('input[name="file_path"]');
        this.image_lagu = document.querySelector('input[name="image_path"]');

        // MSG
        this.song_cover_msg = document.querySelector('#song-cover-msg span');
        this.song_file_msg = document.querySelector('#song-file-msg span');
        this.general_msg = document.querySelector('#general-msg');
    }
    toggleEdit() {
        this.song_details.classList.toggle('display-none');
        this.edit_song.classList.toggle('display-none');
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

    fetchInfo() {
        let xhr1 = new XMLHttpRequest();
        xhr1.open('GET', "http://localhost:8008/process/get_info.php?type=album", true);
        xhr1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr1.onreadystatechange = () => {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                let dat = JSON.parse(xhr1.responseText);
                this.alb_list.innerHTML = '';
                dat.result.forEach((item) => {
                    let opt = document.createElement('option');
                    opt.value = item.album_id;
                    document.getElementById(this.judul_album.getAttribute('id') + '-hidden').value = item.album_id;
                    opt.innerHTML = `${item.judul} ( ${item.penyanyi} )`;
                    this.alb_list.appendChild(opt);
                })
            } else if (xhr1.readyState == 4 && xhr1.status != 200) {
                this.general_msg.classList.remove('display-none');
                this.general_msg.innerHTML = 'Error Fetching Album List' + JSON.parse(xhr1.responseText).message;
            }
        }
        xhr1.send(null);
        let xhr2 = new XMLHttpRequest();
        xhr2.open('GET', "http://localhost:8008/process/get_info.php?type=artist", true);
        xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr2.onreadystatechange = () => {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                let dat = JSON.parse(xhr2.responseText);
                this.artist_list.innerHTML = '';
                dat.result.forEach((item) => {
                    let opt = document.createElement('option');
                    opt.value = item.penyanyi;
                    opt.innerHTML = item.penyanyi;
                    this.artist_list.appendChild(opt);
                })
            } else if (xhr2.readyState == 4 && xhr2.status != 200) {
                this.general_msg.classList.remove('display-none');
                this.general_msg.innerHTML = 'Error Fetching Artist List' + JSON.parse(xhr2.responseText).msg;
            }
        }
        xhr2.send(null);
        let xhr3 = new XMLHttpRequest();
        xhr3.open('GET', "http://localhost:8008/process/get_info.php?type=genre", true);
        xhr3.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr3.onreadystatechange = () => {
            if (xhr3.readyState == 4 && xhr3.status == 200) {
                let dat = JSON.parse(xhr3.responseText);
                this.genre_list.innerHTML = '';
                dat.result.forEach((item) => {
                    let opt = document.createElement('option');
                    opt.value = item.genre;
                    opt.innerHTML = item.genre;
                    this.genre_list.appendChild(opt);
                })
            } else if (xhr3.readyState == 4 && xhr3.status != 200) {
                this.general_msg.classList.remove('display-none');
                this.general_msg.innerHTML = 'Error Fetching Genre List' + JSON.parse(xhr3.responseText).msg;
            }
        }
        xhr3.send(null);
    }
    fetchSong() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8008/process/song_fetch.php?song_id=" + this.song_id, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let song = JSON.parse(xhr.responseText).result[0];
                this.img.src = song.image_path;
                // get album name
                let xhr2 = new XMLHttpRequest();
                xhr2.open('GET', "http://localhost:8008/process/get_info.php?type=album_name&album_id=" + song.album_id, true);
                xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr2.onreadystatechange = () => {
                    if (xhr2.readyState == 4 && xhr2.status == 200) {
                        let album = JSON.parse(xhr2.responseText).result[0];
                        // update input
                        this.judul_lagu.value = song.judul;
                        this.judul_album.value = song.album_id == null ? `Unknown` : `${album.judul} ( ${album.penyanyi} )`;
                        this.penyanyi.value = song.penyanyi;
                        this.genre_lagu.value = song.genre;
                        this.tanggal_terbit_lagu.value = song.tanggal_terbit;
                        this.details.innerHTML = `
                            <h1 class="section-title">${song.judul}</h1>
                            <span>${song.album_id == null ? `Unknown` : `${album.judul}`}</span>
                            <span>${song.penyanyi == null ? `Unknown` : `${song.penyanyi}`}</span>
                            <span>${this.fancyTimeFormat(song.duration)}</span>
                            <span>${song.tanggal_terbit}</span>
                            <span>${song.genre == null ? `Unknown` : song.genre}</span>
                        `
                        // this.image_lagu.value = song.image_path;
                        // this.file_lagu.value = song.audio_path;
                        // get filename from full path
                        this.song_cover_msg.innerHTML = song.image_path == "null" ? '' : song.image_path.split('\\').pop().split('/').pop()
                        this.song_file_msg.innerHTML = song.audio_path.split('\\').pop().split('/').pop()
                    } else if (xhr2.readyState == 4 && xhr2.status != 200) {
                        this.general_msg.classList.remove('display-none');
                        this.general_msg.innerHTML = 'Error Fetching Album Name' + JSON.parse(xhr2.responseText).msg;
                    }
                }
                xhr2.send(null);
            }
        }
        xhr.send(null);
    }
    run() {
        this.fetchInfo()
        this.judul_album.addEventListener('input', (e) => {
            var input = e.target,   
            list = input.getAttribute('list'),
            options = document.querySelectorAll('#' + list + ' option[value="'+input.value+'"]'),
            hiddenInput = document.getElementById(input.getAttribute('id') + '-hidden');
            if (options.length > 0) {
                hiddenInput.value = input.value;
                input.value = options[0].innerText;
            }
        })
        this.song_btn.addEventListener('click', () => {
            this.toggleEdit();
        });
        this.cancel_edit_btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleEdit();
            return false;
        })
        this.fetchSong();
        this.file_lagu.addEventListener('change', (e) => {
            this.song_file_msg.innerHTML = e.target.files[0].name;
        })
        this.image_lagu.addEventListener('change', (e) => {
            this.song_cover_msg.innerHTML = e.target.files[0].name;
        })
        this.delete_button.addEventListener('click', (e) => {
            e.preventDefault();
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8008/process/song_backend.php", true);
            xhttp.onreadystatechange = () =>  {
                if (xhttp.readyState === 4 && xhttp.status === 200){ 
                    window.location.href = "http://localhost:8008/index.php";
                }
            }
            var form = new FormData();
            form.append("song_id", this.song_id);
            xhttp.send(form);
        });

        this.save_button.addEventListener('click', (e) => {
            e.preventDefault();
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8008/process/song_backend.php", true);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200){ 
                    this.general_msg.classList.remove('display-none');
                    this.general_msg.innerHTML = JSON.parse(xhttp.responseText).msg;
                    // refresh
                    window.location.reload();
                } else if (xhttp.readyState === 4 && xhttp.status != 200) {
                    this.general_msg.classList.remove('display-none');
                    this.general_msg.innerHTML = 'Error Saving Song ' + JSON.parse(xhttp.responseText).msg;
                }
            }
            /*
        this.judul_lagu = document.querySelector('input[name="judul"]');
        this.judul_album = document.querySelector('input[name="album"]');
        this.penyanyi = document.querySelector('input[name="artist"]');
        this.genre_lagu = document.querySelector('input[name="genre"]');
        this.tanggal_terbit_lagu = document.querySelector('input[name="release-date"]');
        this.file_lagu = document.querySelector('input[name="file_path"]');
        this.image_lagu = document.querySelector('input[name="image_path"]');
            */
            let form2 = new FormData();
            form2.append("id", this.song_id);
            form2.append("judul_lagu_update", this.judul_lagu.value);
            form2.append("judul_album_update", document.getElementById(this.judul_album.getAttribute('id') + '-hidden').value == "" ? this.judul_album.value : document.getElementById(this.judul_album.getAttribute('id') + '-hidden').value);
            form2.append("penyanyi_update", this.penyanyi.value);
            form2.append("genre_lagu_update", this.genre_lagu.value);
            form2.append("tanggal_terbit_lagu_update", this.tanggal_terbit_lagu.value);
            if (this.file_lagu.files.length > 0) {
                form2.append("file_lagu", this.file_lagu.files[0]);
                console.log("yes")
            }
            if (this.image_lagu.files.length > 0) {
                form2.append("image_lagu", this.image_lagu.files[0]);
                console.log("yes2")
            }
            xhttp.send(form2);
        });

    }
}

const songJS = new SongJS();
songJS.run();