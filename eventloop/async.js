/***
 * 关于v8对async/await的优化：
 * 最初规范：RESOLVE(thenable) 并不等于 Promise.resolve(thenable)
 *  RESOLVE - Promise构造器里的resolve
 *  thenable - 具有then方法的对象
 * 其RESOLVE(thenable) 和 Promise.resolve(thenable) 的转换关系：
 * ## RESOLVE(thenable) 等价于 Promise.resolve().then(() => thenable.then(resolve))
 *
 * 优化规范后：await同等与Promise.resolve()
 */

console.log('script start')

async function async1() {
  //await async2()
  //console.log('async1 end')

  /*********** 修改前 **************/
  // 转换1：上面等价如下
  // return new Promise(resolve => {
  //   resolve(async2())
  // }).then(() => console.log('async1 end'))

  // 转换1等价如下
  // return new Promise(resolve => {
  //   Promise.resolve().then(() => {
  //     async2().then(resolve)
  //   })
  // }).then(() => console.log('async1 end'))

  /*********** 修改前 **************/

  /*********** 修改后 **************/
  // 转换1：上面等价如下
  // Promise.resolve(async2()).then(() => console.log('async1 end'))

  // 因为async2返回一个promise，进一步转化如下：
  async2().then(() => console.log('async1 end'))
  /*********** 修改后 **************/
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
// 旧版输出如下，但是请继续看完本文下面的注意那里，新版有改动
// script start =>
// async2 end =>
// Promise =>
// script end =>
// promise1 =>
// promise2 =>
// async1 end =>
// setTimeout

// chrome新版：
// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout


