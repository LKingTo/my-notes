// 实现Promise.race
// 1.返回的仍然是一个Promise. 它的状态与第一个完成的Promise的状态相同
// 2.如果传入的参数是不可迭代的，那么将会抛出错误
// 3.如果传的参数数组是空，那么返回的 promise 将永远等待
// 4.如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return Promise.reject(new TypeError('args is not iteratable'))
    } else {
      // promises为空数组不用处理，让Promise实例一只处于pending状态
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(data => {
          resolve(data)   // promise状态一旦改变，无法再变，执行慢的无效
        }, e => {
          reject(e)
        })
      }
    }
  })
}

//一直在等待态
promiseRace([]).then((data) => {
  console.log('success ', data);
}, (err) => {
  console.log('err ', err);
});

//抛错
promiseRace().then((data) => {
  console.log('success ', data);
}, (err) => {
  console.log('err ', err);
});

promiseRace([
  new Promise((resolve, reject) => { setTimeout(() => { resolve(1000) }, 1000) }),
  new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
  new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
  console.log('success', data);
}, (err) => {
  console.log('err', err);
});
