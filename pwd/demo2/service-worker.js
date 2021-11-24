console.log('Hello from service-worker.js');

importScripts('./js/simpleEvent.js')
const simpleEvent = new SimpleEvent()

// 在service worker中监听install
self.addEventListener('install', (event) => {
  console.log('【event: install】', event)

  // 跳过等待阶段，直接使用最新版本的SW（无需关闭窗口，直接刷新页面）
  self.skipWaiting();

  event.waitUntil(
    // 安装阶段，设置缓存
    caches.open('cache-image2').then(cache => {
      return cache.addAll([
        'img/lapulasi.png',
        'img/xueLong.png',
        'img/minasi.png',
        'json/serviceProdWhiteList.json'
      ])
    })
  )
})

var cacheWhitelist = ['cache-image2'];

self.addEventListener('activate', event => {
  console.log('【event: activate】');

  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        // 版本更新时，清除旧版本的缓存
        // 注意：waitUntil里的promise会阻塞其他事件（如第一个fetch事件）直到完成
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('now ready to handle fetches!');
    })
  );
});

// 监听fetch事件
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // console.log('【event: fetch】', url, event)
  const {origin, pathname} = url
  if (origin === location.origin && pathname === '/my-notes/pwd/demo2/img/haiReng.png') {
    // 请求图片时，以缓存的图片替换
    // event.respondWith(caches.match('img/lapulasi.png'));
    event.respondWith(caches.match('img/xueLong.png'));
  }

  // 缓存优先，后网络请求设置缓存，始终失败以默认图片替代
  if (origin === location.origin && pathname === '/my-notes/pwd/demo2/img/qingNiao.png') {
    event.respondWith(
      caches.match(event.request).then(() => {
        return fetch(event.request).then(response => {
          // console.log('response', response)
          if (response.status === 404) {  // fetch返回的404不会作为异常触发
            return caches.match('img/minasi.png')
          }
          return caches.open('cache-image2').then(cache => {
            cache.put(event.request, response.clone())
            return response
          })
        })
      }).catch((e) => {
        // console.log('error', e)
        return caches.match('img/minasi.png')
      })
    )
  }

  if (pathname === '/api/robot/investment/2.0.0/others/settings/serviceProdWhiteList') {
    event.respondWith(
      caches.match('json/serviceProdWhiteList.json')
    )
  }
});

// 监听sync事件，延迟网络任务
self.addEventListener('sync', event => {
  // console.log('sync event', event)
  const tag = JSON.parse(event.tag)
  const {type, msg} = tag || {}
  if (type === 'sync-click-btn') {
    // const url = 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/baiduyun@2x-e0be79e69e.png'
    // const url = 'https://robot.gf.com.cn/api/robot/investment/2.0.0/others/settings/serviceProdWhiteList'
    const url = 'https://cdn.gfzq.cn/robot/assets/images/login-sm.png'
    const request = new Request(`${url}?id=${msg.id}`, {mode: 'no-cors'})
    event.waitUntil(
      fetch(request).then(async res => {
        // 离线状态下，不管客户端注册多少次sync事件，待恢复网络后只会执行一次
        console.log('[backgroundSync response]: ', res)
        // 获取客户端，并向客户端发送响应数据
        self.clients.matchAll({includeUncontrolled: false}).then(clients => {
          clients.forEach(client => {
            // if (client.id === 'xxxxx') {   // 限制条件，缺点：无法预获得指定clientId
              client.postMessage({type, msg: 'A response pic!'})
            // }
          })
        })
        return res
      })
    )

    /***************** 离线恢复时，waitUntil仅对首个promise立即执行 *******************/
    // const promise = new Promise((resolve, reject) => {
    //   simpleEvent.once(type, data => {
    //     resolve(data)
    //   })
    // })
    // const url = 'https://cdn.gfzq.cn/robot/assets/images/login-sm.png'
    // const request = new Request(`${url}?id=${msg.id}`, {mode: 'no-cors'})
    // event.waitUntil(
    //   promise.then(data => {
    //     const {clientId} = data
    //     return fetch(request)
    //   }).then(async res => {
    //     // 离线状态下，不管客户端注册多少次sync事件，待恢复网络后只会执行一次
    //     console.log('[backgroundSync response]: ', res)
    //     return res
    //   })
    // )
    /***************** 离线恢复时，waitUntil仅对首个promise立即执行 *******************/
  }
})

// 监听postMessage事件
self.addEventListener('message', event => {
  // console.log('【event: message】', event)
  const {data, ports} = event
  const port = ports[0]
  if (data.action === 'computed') {
    if (port) {
      port.postMessage(data.value * 2)
    } else {
      // 使用client.postMessage()
    }
  }

  if (data.action === 'sync') {
    simpleEvent.trigger(data.type, {clientId: event.source.id})
  }
})

function isNumber (value) {
  return typeof value === 'number'
}
