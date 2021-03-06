console.log('script start')

async function async1() {
  //await async2()  // 返回一个promise实例,它的then的回调立即进入job队列
  //console.log('async1 end')

  // v8优化后，等价于下列：
  // Promise.resolve(async2()).then(() => console.log('async1 end'))

  // 等价于下列
  // async2().then(() => console.log('async1 end'))

  // 等价于下列
  new Promise(resolve => {
    console.log('async2 end')
    resolve(
      Promise.resolve().then(() => {console.log('async2 end1')
    }))
  }).then(() => console.log('async1 end'))
}

async function async2() {
  console.log('async2 end')
  /************************************/
  return Promise.resolve().then(() => {
    console.log('async2 end1')
  })
  /************************************/
}

async1()

setTimeout(function () {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })

console.log('script end')

// chrome:
// script start
// async2 end
// Promise
// script end
// async2 end1
// promise1
// promise2
// async1 end
// setTimeout

// node:
// script start
// async2 end
// Promise
// script end
// async2 end1
// promise1
// promise2
// async1 end
// setTimeout
