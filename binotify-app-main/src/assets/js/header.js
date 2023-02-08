class HeaderJS {
    constructor() {
        this.searchbarnav = document.querySelector('#search-bar-nav');
        this.isSbarToggled = false;
        this.toggler = document.querySelector('.search-icon');
        this.listenerWidthMobile = window.matchMedia('(max-width: 768px)');
        this.logout_btn = document.querySelector('#logout-btn');
    }
    dologout() {
        let xhr = new XMLHttpRequest();
        let url = 'http://localhost:8008/process/logout.php';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                window.location.href = 'http://localhost:8008/';
            }
        }
        xhr.send();
    }
    searchBarToggler() {
        if (this.isSbarToggled) {
            let navchild = document.querySelector('nav');
            for (let i = 0; i < navchild.children.length; i++) {
                // if (!navchild.children[i].classList.contains('search-btn-wrapper') && !(navchild.children[i].id === 'dropdown-cbox')) {
                    navchild.children[i].style.display = '';
                // }
            }
            //document.querySelector('.search-bar').style.display = '';
            document.querySelector('.search-icon').attributes.src.value = '/assets/img/search.svg';
        } else {
            let navchild = document.querySelector('nav');
            for (let i = 0; i < navchild.children.length; i++) {
                if (!navchild.children[i].classList.contains('search-btn-wrapper')) {
                    navchild.children[i].style.display = 'none';
                }
                if (window.matchMedia("(max-width: 768px)").matches) {
                    document.querySelector('nav ul').style.display = '';
                }
            }
            document.querySelector('.search-bar').style.display = 'inline-block';
            document.querySelector('.search-icon').attributes.src.value = '/assets/img/times.svg';
        }
        this.isSbarToggled = !this.isSbarToggled;
    }
    run() {
        this.listenerWidthMobile.addEventListener("change", () => {
            if (!this.listenerWidthMobile.matches && this.isSbarToggled) {
                document.querySelector('nav ul').style.display = 'none';
            }
        })
        this.toggler.addEventListener('click', e => {
            e.preventDefault();
            this.searchBarToggler();
        })
        this.logout_btn.addEventListener('click', this.dologout);
        if (this.searchbarnav.value !== '') {
            this.searchBarToggler();
            this.isSbarToggled = true;
        }
    }
    
}

const headerjs = new HeaderJS();
headerjs.run();