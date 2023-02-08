class LoginJS {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.url = 'http://localhost:8008/process/login_backend.php';
        this.loginform = document.querySelector('#login-form');
        this.submitbtn = this.loginform.querySelector('input[name="submit-btn"]');
        this.emailuname = this.loginform.querySelector('input[name="emailuname"]');
        this.password = this.loginform.querySelector('input[name="password"]');
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
        this.submitbtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.xhr.open('POST', this.url, true);
            this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            this.xhr.onreadystatechange = () => {
                if (this.xhr.status === 200 && this.xhr.readyState === 4) {
                    // redirect to main
                    window.location.href = 'http://localhost:8008/';
                    // console.log(this.xhr.responseText);
                }
            }
            this.xhr.send(this.serialize({emailuname: this.emailuname.value, password: this.password.value}));
        });
    }
}

const loginJS = new LoginJS();
loginJS.run();