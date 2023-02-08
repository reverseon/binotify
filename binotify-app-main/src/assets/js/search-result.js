class SearchResultJS {
    constructor() {
        this.page = 1;
        this.filterBtn = document.querySelector('.search-filter-icon');
        this.isFilterToggled = false;
        this.search_filtered_btn = document.querySelector('#search-filtered-btn');
        // QUERY GETTER
        this.search_bar = document.querySelector('#search-bar-nav');
        this.type_judul = document.querySelector('#type-judul');
        this.type_penyanyi = document.querySelector('#type-penyanyi');
        this.type_tahun = document.querySelector('#type-tahun');
        this.genre_form = document.querySelector('#genre-select');
        this.sort_by = document.querySelectorAll('.sort-by input');
        this.sort_order = document.querySelectorAll('.sort-order input');
        this.output = document.querySelector('.song-middle-limit');
        this.next_btn = document.querySelector('.l-next-page-icon');
        this.prev_btn = document.querySelector('.l-previous-page-icon');
        this.stop_page = false;
        this.pagecount = document.querySelector('.l-current-page');
        this.genre_sel = document.querySelector('#genre-select-opt');
    }
    serialize(obj) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    searchFiltered() {
        let query = this.search_bar.value;
        let judul = this.type_judul.checked;
        let penyanyi = this.type_penyanyi.checked;
        let tahun = this.type_tahun.checked;
        let genre = this.genre_form.value;
        let sort_by = '';
        let sort_order = '';
        for (let i = 0; i < this.sort_by.length; i++) {
            if (this.sort_by[i].checked) {
                sort_by = this.sort_by[i].value;
            }
        }
        for (let i = 0; i < this.sort_order.length; i++) {
            if (this.sort_order[i].checked) {
                sort_order = this.sort_order[i].value;
            }
        }
        let page = this.page;
        let limit = 5;
        let param = this.serialize({query: query, judul: judul, penyanyi: penyanyi, tahun: tahun, genre: genre, sortby: sort_by, order: sort_order, page: page, limit: limit});
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8008/process/song_fetch.php' + "?" + param, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let parsed = JSON.parse(xhr.responseText);
                if (parsed.result.length === 0) {
                    this.previousPage();
                    this.stop_page = true;   
                }
                let xhr2 = new XMLHttpRequest();
                xhr2.open('GET', 'http://localhost:8008/components/list-display.php' + "?type=song&json=" +  JSON.stringify(parsed.result), true);
                xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr2.onreadystatechange = () => {
                    if (xhr2.status === 200 && xhr2.readyState === 4) {
                        this.output.innerHTML = xhr2.responseText;
                    }
                }
                xhr2.send();
            }
        }
        xhr.send(null);
    }
    toggleFilter() {
        if (this.isFilterToggled) {
            document.querySelector('.filter-form').classList.add('display-none');
            this.isFilterToggled = false;
        } else {
            document.querySelector('.filter-form').classList.remove('display-none');
            this.isFilterToggled = true;
        }
    }
    previousPage() {
        console.log(this.page, this.stop_page);
        if (this.page > 1) {
            if (this.stop_page) {
                this.stop_page = false;
            }
            this.page--;
            this.searchFiltered();
            this.pagecount.innerHTML = this.page;
        }
    }
    nextPage() {
        if (!this.stop_page) {
            this.page++;
            this.searchFiltered();
            this.pagecount.innerHTML = this.page;
        }
    }
    run() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8008/process/song_fetch.php' + "?get_genre=true", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let parsed = JSON.parse(xhr.responseText);
                console.log(parsed.result)
                for (let i in parsed.result) {
                    let option = document.createElement('option');
                    option.value = parsed.result[i].genre;
                    option.innerHTML = parsed.result[i].genre;
                    this.genre_sel.appendChild(option);
                }
            }
        }
        xhr.send(null);
        this.searchFiltered();
        this.filterBtn.addEventListener('click', () => (this.toggleFilter()));
        this.search_filtered_btn.addEventListener('click', (e) => { e.preventDefault; this.searchFiltered()});
        this.next_btn.addEventListener('click', () => (this.nextPage()));
        this.prev_btn.addEventListener('click', () => (this.previousPage()));
    }
}

const searchResultJS = new SearchResultJS();
searchResultJS.run();