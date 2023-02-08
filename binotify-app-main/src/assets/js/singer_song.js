class SingerSongJS {
    constructor(){
        this.song_out = document.querySelector('.song-out');
        this.creator_id = document.querySelector('#creator-id').value;
        this.subscriber_id = document.querySelector('#subscriber-id').value;
        this.output = document.querySelector('.alb-middle-limit');
        console.log(this.creator_id, this.subscriber_id);
    }
    //TODO : bikin, kayanya aku ngikut yang album
    fetchUserSong(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:3001/api/app/song?creator_id="+ this.creator_id +"&subscriber_id=" + this.subscriber_id, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Siesta-Chicken-Nugget');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let parsed = JSON.parse(xhr.responseText);
                console.log(parsed)
                let xhr2 = new XMLHttpRequest();
                xhr2.open('GET', 'http://localhost:8008/components/list-display.php' + "?type=singer-song&json=" +  JSON.stringify(parsed[0]), true);
                xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr2.onreadystatechange = () => {
                    if (xhr2.status === 200 && xhr2.readyState === 4) {
                        this.output.innerHTML = xhr2.responseText;
                    }
                }
                xhr2.send(null);
            } else {
                console.log(xhr.status, xhr.responseText);
            }
        }
        xhr.send();
    }

    run(){
        this.fetchUserSong();
    }
}

const singerSongJS = new SingerSongJS();
singerSongJS.run();