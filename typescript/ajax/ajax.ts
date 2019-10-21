interface Config {
    url: string,
    method: string,
    data?: string
}

let ajax = function (config: Config): void {
    let xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}