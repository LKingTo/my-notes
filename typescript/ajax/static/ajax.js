"use strict";
var ajax = function (config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
};
