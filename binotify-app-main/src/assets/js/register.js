class RegisterJS {
    /*
                    <input type="text" class="input-text" id="username-field" placeholder="Username">
                    <input type="text" class="input-text" id="email-field" placeholder="Email">
                    <input type="password" class="input-text" id="pw-field" placeholder="Password">
                    <input type="password" class="input-text" id="cpw-field" placeholder="Reconfirm Password">
                    <input type="button" class="button-filter" id="submit-btn" value="Register">
    */
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.ep = 'http://localhost:8008/process/register_backend.php';
        this.usernameField = document.getElementById("username-field");
        this.emailField = document.getElementById("email-field");
        this.pwField = document.getElementById("pw-field");
        this.cpwField = document.getElementById("cpw-field");
        this.submitBtn = document.getElementById("submit-btn");
        this.username_msg = document.getElementById("uname-msg");
        this.email_msg = document.getElementById("email-msg");
        this.cpw_msg = document.getElementById("cpw-msg");
        this.login_msg = document.getElementById("login-msg"); 
        this.uname_regex = /^[a-zA-Z0-9_]+$/;
        this.email_regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    }
    validateUsername(e) {
        let v = this.uname_regex.test(e.target.value)
        this.username_msg.classList.toggle("display-none", false);
        this.username_msg.style.fontWeight = "bold";
        if (v) {
            this.username_msg.innerHTML = "Username is valid";
            this.username_msg.style.color = "#59ff85";
        }
        else {
            this.username_msg.innerHTML = "Must contain only alphanumeric or underscore and must have length > 0";
            this.username_msg.style.color = "#ff5959";
        }

    }
    validateEmail(e) {
        let v = this.email_regex.test(e.target.value)
        this.email_msg.classList.toggle("display-none", false);
        this.email_msg.style.fontWeight = "bold";
        if (v) {
            this.email_msg.innerHTML = "Email is valid";
            this.email_msg.style.color = "#59ff85";
        }
        else {
            this.email_msg.innerHTML = "Must be a valid email";
            this.email_msg.style.color = "#ff5959";
        }
    }
    validateMatchPW() {
        this.cpw_msg.classList.toggle("display-none", false);
        this.cpw_msg.style.fontWeight = "bold";
        if (this.pwField.value === this.cpwField.value) {
            this.cpw_msg.innerHTML = "Passwords match";
            this.cpw_msg.style.color = "#59ff85";
        } else {
            this.cpw_msg.innerHTML = "Passwords do not match";
            this.cpw_msg.style.color = "#ff5959";
        }
    }
    serialize(obj) {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    getuname() {
        let xhrget1 = new XMLHttpRequest();
        xhrget1.open("GET", this.ep + "?" + this.serialize({username:this.usernameField.value}), true);
        xhrget1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhrget1.onreadystatechange = () => { 
            if (xhrget1.readyState == 4) {
                let resp = JSON.parse(xhrget1.responseText);
                if (resp.status == 400) {
                    this.username_msg.classList.toggle("display-none", false);
                    this.username_msg.style.fontWeight = "bold";
                    this.username_msg.innerHTML = resp.msg;
                    this.username_msg.style.color = "#ff5959";
                } else if (resp.status == 200) {
                    this.getemail();
                }
            }
        }
        xhrget1.send(null);
    }
    getemail() {
        let xhrget2 = new XMLHttpRequest();
        xhrget2.open("GET", this.ep + "?" + this.serialize({email:this.emailField.value}), true);
        xhrget2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhrget2.onreadystatechange = () => {
            if (xhrget2.readyState == 4) {
                let resp = JSON.parse(xhrget2.responseText);
                if (resp.status == 400) {
                    this.email_msg.classList.toggle("display-none", false);
                    this.email_msg.style.fontWeight = "bold";
                    this.email_msg.innerHTML = resp.msg;
                    this.email_msg.style.color = "#ff5959";
                } else if (resp.status == 200) {
                    this.regist()
                }
            }
        }
        xhrget2.send(null);
    }
    regist() {
        let xhrpost = new XMLHttpRequest();
        xhrpost.open("POST", this.ep, true);
        xhrpost.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhrpost.onreadystatechange = () => {
            if (xhrpost.readyState == 4 && xhrpost.status == 200) {
                let response = JSON.parse(xhrpost.responseText);
                if (response.status === 200) {
                    this.login_msg.classList.toggle("display-none", false);
                    this.login_msg.style.fontWeight = "bold";
                    this.login_msg.innerHTML = "Registration successful! Redirecting to login page...";
                    this.login_msg.style.color = "#59ff85";
                    setTimeout(() => {
                        window.location.href = "login.php";
                    }, 2000);
                } else {
                    this.login_msg.classList.toggle("display-none", false);
                    this.login_msg.style.fontWeight = "bold";
                    this.login_msg.innerHTML = "Registration failed! Please try again.";
                    this.login_msg.style.color = "#ff5959";
                }
            }
        }
        xhrpost.send(`username=${this.usernameField.value}&email=${this.emailField.value}&password=${this.pwField.value}`);
    }
    sendRequest() {
        this.getuname()
    }
    run() {
        this.usernameField.addEventListener("input", (e) => {
            this.validateUsername(e);
        });
        this.emailField.addEventListener("input", (e) => {
            this.validateEmail(e);
        })
        this.cpwField.addEventListener("input", () => {
            this.validateMatchPW();
        })
        this.submitBtn.addEventListener("click", () => {
            this.sendRequest();
        })
    }
}

const registerJS = new RegisterJS();
registerJS.run();