// 实现Promise.all
// 1.输入一个promise数组，输出一个promise对象
// 2.所有promise都为resolve状态时，才输出相同数量的结果
// 3.产生第一个reject状态时，立即输出该错误结果

function promiseAll(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError('args is not iterable'))
  }
  if (promises.length === 0) {
    return Promise.resolve(promises)
  }
  const resolveArray = []
  let resolveNumber = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolveArray[i] = res
        resolveNumber++
        if (resolveNumber === promises.length) {
          resolve(resolveArray)
        }
      }, err => {
        reject(err)
      })
    }
  })
}

promiseAll([
  // new Promise((resolve, reject) => { setTimeout(() => { resolve(1000) }, 1000) }),
  // new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
  // new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 100) })
]).then((data) => {
  console.log('success', data);
}, (err) => {
  console.log('err', err);
});
