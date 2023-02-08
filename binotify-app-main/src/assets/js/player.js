class PlayerJS {
    constructor() {
        this.isPlaying = false;

        this.xhr = new XMLHttpRequest();
        this.url = 'http://localhost:8008/process/song_fetch.php';

        this.song_id3 = document.querySelector('#song-id').value;
        this.song = document.querySelector('#audio');
        this.seekBar = document.querySelector('.music-seek-bar');
        this.songName = document.querySelector('.np-music');
        this.songArtist = document.querySelector('.np-artist');
        this.currentTime = document.querySelector('.np-current-time');
        this.songDuration = document.querySelector('.np-duration');
        this.playerPlay = document.querySelector('.player-play');
        this.playerNext = document.querySelector('.player-next');
        this.playerPrev = document.querySelector('.player-prev');
        this.volSlider = document.querySelector('.volume-slider');
    }
    formatTime(time) {
        let min = Math.floor(time / 60);
        if (min < 10) {
            min = `0${min}`;
        }
        let sec = Math.floor(time % 60);
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    }

    setSong(song) {
        this.seekBar.value = 0;

        this.song.src = '..' + song.audio_path;
        this.songName.innerHTML = song.judul;
        this.songArtist.innerHTML = song.penyanyi;

        this.currentTime.innerHTML = '00:00';
        setTimeout(() => {
            this.songDuration.innerHTML = this.formatTime(this.song.duration);
            this.seekBar.max = this.song.duration;
        }, 300);
    }

    run() {
        this.xhr.open('GET', "http://localhost:8008/process/song_fetch.php?song_id="+ this.song_id3, true);
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        this.xhr.onreadystatechange = () => {
            if (this.xhr.status === 200 && this.xhr.readyState === 4) {
                this.setSong(JSON.parse(this.xhr.responseText).result[0]);
                console.log(JSON.parse(this.xhr.responseText).result[0]);
                setInterval(() => {
                    this.seekBar.value = this.song.currentTime;
                    this.currentTime.innerHTML = this.formatTime(this.song.currentTime);
                    if (Math.floor(this.song.currentTime) == Math.floor(this.seekBar.max)) {
                        this.playerNext.click();
                    }
                }, 500)

                this.playerPlay.addEventListener('click', () => {
                    if (!this.isPlaying) {
                        this.playerPlay.attributes.src.value = 'assets/img/player-pause.svg';
                        this.isPlaying = true;
                        this.song.play();
                    } else {
                        this.playerPlay.attributes.src.value = 'assets/img/player-play.svg';
                        this.isPlaying = false;
                        this.song.pause();
                    }
                })
        
                this.seekBar.addEventListener('change', () => {
                    this.song.currentTime = this.seekBar.value;
                })
        
                this.volSlider.addEventListener('change', () => {
                    this.song.volume = this.volSlider.value;
                })
            }
        }
        this.xhr.send();
    }
}

const playerJS = new PlayerJS();
playerJS.run();