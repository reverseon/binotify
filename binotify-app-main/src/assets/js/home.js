class HomeJS {
    constructor() {
        this.output = document.querySelector('.song-mid-limit');
    }
    serialize(obj) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    fetchCurrentPage() {
        let xhr = new XMLHttpRequest();
        let param = this.serialize({query: '', judul: 'true', penyanyi: 'false', tahun: 'false', genre: 'all', sortby: 'tahun', order: 'desc', page: '1', limit: '10000000000'});
        xhr.open('GET', 'http://localhost:8008/process/song_fetch.php?' + param, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let parsed = JSON.parse(xhr.responseText);
                this.output.innerHTML = '';
                let xhr2 = new XMLHttpRequest();
                xhr2.open('GET', 'http://localhost:8008/components/list-display.php' + "?type=song&json=" +  JSON.stringify(parsed.result), true);
                xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr2.onreadystatechange = () => {
                    if (xhr2.status === 200 && xhr2.readyState === 4) {
                        this.output.innerHTML = xhr2.responseText;
                    }
                }
                xhr2.send(null);
            }
        }
        xhr.send(null);
    }

    run() {
        this.fetchCurrentPage();
    }
}

const homejs = new HomeJS();
homejs.run();


