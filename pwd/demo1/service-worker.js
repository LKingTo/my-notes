console.log('Hello from service-worker.js');

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("../lib/workbox/workbox-sw.js");

//设置默认cacheName，最好写在紧贴着importScripts workbox-sw.js的下面，如果写在文件最后，则不生效。
workbox.core.setCacheNameDetails({
  prefix: "sw",
  suffix: "v1",
  precache: "custom-precache",
  runtime: "custom-runtime"
});

// 在service-worker在安装之前，就把对应文件预先缓存
workbox.precaching.precacheAndRoute([
  // "css/index.css",
  // "js/index.js",
  "https://cdn.gfzq.cn/robot/fima/css/app.de6932b0.css",
  "https://unpkg.com/vue@next"
]);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  //缓存文件
  workbox.routing.registerRoute(
    /\.css$/,   //通过正则匹配需要缓存哪些文件
    new workbox.strategies.StaleWhileRevalidate({ // 读cache、请求网络并行
      // cacheName: 'sw-v1-css-cache',  //缓存名，可在application-> Cache storage下找到
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js)$/,
    new workbox.strategies.CacheFirst({   // 优先读cache
      cacheName: 'sw-v1-js-cache',
      plugins: [
        //设置过期时间和最大数量
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

