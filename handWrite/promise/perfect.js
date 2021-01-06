// 实现一个promise 进阶版
// Promise/A+规范：
//
// 三种状态pending| fulfilled(resolved) | rejected
// 当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态
// 当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。
//
// 必须有一个then异步执行方法，then接受两个参数且必须返回一个promise

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function myPromise(executor) {
  let self = this
  self.status = PENDING
  self.value = undefined
  self.reason = undefined
  self.onFullfilledArray = []
  self.onRejectedArray = []
  function resolve(value) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLED
        self.value = value
        self.onFullfilledArray.forEach(fn => fn(self.value))
      }
    })
  }
  function reject(reason) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED
        self.reason = reason
        self.onRejectedArray.forEach(fn => fn(self.reason))
      }
    })
  }
  try {
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}
myPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
  let self = this
  let newPromise
  switch (self.status) {
    case FULFILLED:
      newPromise = new myPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let temple = onFulfilled(self.value)
            resolvePromise(newPromise, temple, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      break
    case REJECTED:
      newPromise = new myPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let temple = onRejected(self.reason)
            resolvePromise(newPromise, temple, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      break
    case PENDING:
      newPromise = new myPromise((resolve, reject) => {
        self.onFullfilledArray.push(value => {
          setTimeout(() => {
            try {
              let temple = onFulfilled(value)
              resolvePromise(newPromise, temple, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        self.onRejectedArray.push(reason => {
          setTimeout(() => {
            try {
              let temple = onRejected(reason)
              resolvePromise(newPromise, temple, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      })
      break
    default:
  }
  return newPromise
}

// 处理onFulfilled或onRejected返回值的情况，修改promise的状态值
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('cycle reference'))
  }
  let isUsed  // isUsed有什么用？
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') { // x是一个promise实例
        then.call(x, y => {
          if (isUsed) return
          isUsed = true
          resolvePromise(promise, y, resolve, reject)
        }, e => {
          if (isUsed) return
          isUsed = true
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (isUsed) return
      isUsed = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

// check
const customPromise = myPromise
// const customPromise = Promise

const p = new customPromise((resolve, rejected) => {
  const p2 = new customPromise((resolve, rejected) => {resolve(2)})
  resolve(p2)
})
p.then(res => {
  // return () => {}   // 返回该对象
  // return {then: ''}
  // return p
  // return '33'
  return new customPromise((resolve, rejected) => {
    resolve('44')
  })
    .then(r => {
      console.log('r', r) // r 44
      return 55
    })
})
  .then(res => {
  console.log(res)  // 55
})
