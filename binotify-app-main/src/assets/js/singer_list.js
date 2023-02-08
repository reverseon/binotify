class SingerListJS {
    constructor(user_id) {
        this.user_id = user_id;
        this.output = document.querySelector('.alb-middle-limit>.list-display>ul');
    }
    async makeRequest(url, method, header, payload) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            if (header !== null) {
                for (let i = 0; i < header.length; i++) {
                    xhr.setRequestHeader(header[i].key, header[i].value);
                }
            }
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send(payload);
        });
    }
    async refreshSub() {
        let _ = await this.makeRequest("http://localhost:8008/tubes_2/callback_ep.php?call_req=true", "GET", null, null);
    }
    async doSubscribe(creator_id, subscriber_id) {
        let _ = await this.makeRequest("http://localhost:8008/tubes_2/set_sub.php?creator_id=" + creator_id + "&subscriber_id=" + subscriber_id, "GET", null, null);
    }
    async fetchSinger() {
        let singerData = await this.makeRequest('http://localhost:3001/api/app/singer', 'GET', 
        [{ key: 'Authorization', value: 'Siesta-Chicken-Nugget' }], null);
        singerData = JSON.parse(singerData);
        console.log(singerData);
        let sub_info = await this.makeRequest('http://localhost:8008/tubes_2/req_sub.php', 'GET', null, null);
        sub_info = JSON.parse(sub_info);
        console.log(sub_info.result);
        this.output.innerHTML = '';
        singerData.forEach((singer) => {
            console.log({
                creator_id: singer.id_user.toString(),
                subscriber_id: this.user_id.toString(),
                status: "ACCEPTED"
            })
            this.output.innerHTML += `
                <li>
                    <a href="#" class="l-elmt">
                        <div class="l-elmt-detail-wrapper">
                        <div class="l-elmt-detail"> 
                            <div class="l-elmt-detail-title">${singer.name_user}</div>
                        </div>
                        </div>
                        <div class="delete-icon-wrap">
                        ${
                            (
                                sub_info.result.filter((sub) => {
                                    return (
                                        sub.creator_id === singer.id_user.toString() &&
                                        sub.subscriber_id === this.user_id.toString() &&
                                        sub.status === "ACCEPTED"
                                    )
                                }).length > 0
                            ) ? (
                                `<button class="button-filter" onclick="location.href = '/singer_song.php?id=${singer.id_user}'">See Song</button>`
                            ) : (
                                `<button class="button-filter"
                                onclick="
                                    ${
                                        this.doSubscribe(singer.id_user, this.user_id)
                                    }
                                ">Subscribe</button>`
                            )
                        }
                        </div>
                    </a>
                </li>
            `;
        });
    }
    run() {
        this.refreshSub();
        this.fetchSinger();
        setInterval(() => {
            this.refreshSub();
            this.fetchSinger();
        }, 5000);
    }
}

const singerListJS = new SingerListJS(id_user);
singerListJS.run();