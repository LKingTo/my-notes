console.log('Hello from service-worker.js');

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("../lib/workbox/workbox-sw.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // 设置默认cacheName，最好写在紧贴着importScripts workbox-sw.js的下面，如果写在文件最后，则不生效。
  workbox.core.setCacheNameDetails({
    prefix: "sw",
    suffix: "v1",
    precache: "custom-precache",
    runtime: "custom-runtime"
  });

  workbox.core.skipWaiting()   // 强制激活最新版的SW
  workbox.core.clientsClaim()  // 使被激活的SW立即获取页面控制权

  // 在service-worker在安装之前，就把对应文件预先缓存
  workbox.precaching.precacheAndRoute([
    // "css/index.css",
    // "js/index.js",
    // "img/msapplication-icon-144x144.png",
    // {
    //   "revision": "670da494eba35fb04359",
    //   "url": "https://cdn.gfzq.cn/robot/fima/css/app.de6932b0.css"
    // },
    {
      "revision": "73a4536215dfb863dea6",
      "url": "https://unpkg.com/vue@next"
    }
    // ], { ignoreURLParametersMatching: [/.*/] });
  ]);

  // 运行时缓存，多个同时匹配，按注册先后顺序优先级缓存
  workbox.routing.registerRoute(
    /.*\.css$/,   //通过正则匹配需要缓存哪些文件
    // new workbox.strategies.StaleWhileRevalidate({ // 读cache、请求网络并行
    // new workbox.strategies.CacheFirst({ // 读cache、请求网络并行
    new workbox.strategies.StaleWhileRevalidate({
      // cacheName: 'sw-v1-css-cache',  //缓存名，可在application-> Cache storage下找到
      fetchOptions: {
        credentials: 'include' // 支持跨域
      }
    })
  );

  workbox.routing.registerRoute(
    /.*\.js$/,
    // new workbox.strategies.CacheFirst({   // 优先读cache
    new workbox.strategies.StaleWhileRevalidate({
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

  // workbox.routing.registerRoute(
  //   /.*\.(png|gif|jpg|jpeg|svg)$/,    // 要加上 .* 匹配
  //   // /^https:\/\/cdn.gfzq.cn\/.*\.(?:jpg)$/,
  //   new workbox.strategies.StaleWhileRevalidate({
  //     cacheName: "img-cache",
  //     fetchOptions: {
  //       credentials: 'include'
  //     },
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 60,
  //         maxAgeSeconds: 86400,
  //         purgeOnQuotaError: false
  //       })
  //     ]
  //   }), 'GET');

  workbox.routing.registerRoute(
    /^https:\/\/cdn/,
    // new workbox.strategies.NetworkFirst({
    new workbox.strategies.StaleWhileRevalidate({
    // new workbox.strategies.CacheFirst({
      cacheName: 'cdn-cache',
      networkTimeoutSeconds: 20,
      plugins: [
        new workbox.cacheableResponse.Plugin({statuses: [200]})
      ],
      fetchOptions: {
        credentials: 'include' // 支持跨域
      }
    }), 'GET')
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

