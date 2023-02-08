class UserListJS {
    constructor() {
        this.page = 1;
        this.fetchurl = 'http://localhost:8008/process/user_backend.php';
        this.displayurl = 'http://localhost:8008/components/list-display.php';
        this.output = document.querySelector('.list-user-limit');
    }

    run() {
        let xhrfetch = new XMLHttpRequest();
        xhrfetch.open('GET', this.fetchurl + '?a=fetch', true);
        xhrfetch.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhrfetch.onreadystatechange = () => {
            if (xhrfetch.status === 200 && xhrfetch.readyState === 4) {
                let xhrdisplay = new XMLHttpRequest();
                xhrdisplay.open('GET', this.displayurl + "?type=user&json=" +  JSON.stringify(JSON.parse(xhrfetch.responseText).result), true);
                xhrdisplay.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrdisplay.onreadystatechange = () => {
                    if (xhrdisplay.status === 200 && xhrdisplay.readyState === 4) {
                        this.output.innerHTML = xhrdisplay.responseText;
                    }
                }
                xhrdisplay.send();
            }
        }
        xhrfetch.send();
    }
}

const userlistJS = new UserListJS();
userlistJS.run();