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
  self.onFullfilledArray = []  // 为什么是数组？可能有多个.then
  self.onRejectedArray = []

  function resolve(value) {
    setTimeout(() => {  // 为什么要延时？保证then的回调被订阅后才执行resolve，事件循环机制
      if (self.status === PENDING) {  // 为什么要判断状态？状态一旦改变不能再变
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
  } catch (e) {  // 执行器执行期间任何异常都用reject处理
    reject(e)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  }
  let self = this
  let newPromise

  function handleOnFulfilled(onFulfilled, newPromise, value, resolve, reject) {
    setTimeout(() => {
      try {
        let newResolveValue = onFulfilled(value)  // 新promise的value
        resolvePromise(newPromise, newResolveValue, resolve, reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function handleOnRejected(onRejected, newPromise, reason, resolve, reject) {
    setTimeout(() => {
      try {
        let newRejectReason = onRejected(reason) // 新promise的reason
        resolvePromise(newPromise, newRejectReason, resolve, reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  switch (self.status) {
    case FULFILLED:
      // 为什么返回一个新Promise？为了.then的链式调用
      newPromise = new myPromise((resolve, reject) => {
        handleOnFulfilled(onFulfilled, newPromise, self.value, resolve, reject)
      })
      break
    case REJECTED:
      newPromise = new myPromise((resolve, reject) => {
        handleOnRejected(onRejected, newPromise, self.reason, resolve, reject)
      })
      break
    case PENDING:
      newPromise = new myPromise((resolve, reject) => {
        self.onFullfilledArray.push(value => {
          handleOnFulfilled(onFulfilled, newPromise, value, resolve, reject)
        })
        self.onRejectedArray.push(reason => {
          handleOnRejected(onRejected, newPromise, reason, resolve, reject)
        })
      })
      break
    default:
  }
  return newPromise
}

/**
 * 处理上一个then函数onFulfilled或onRejected返回值的情况，修改新promise的状态值
 * @param promise     then函数返回的新promise对象
 * @param returnValue then函数onFulfilled或onRejected的函数返回值
 * @param resolve     新promise的内部resolve
 * @param reject      新promise的内部reject
 * @returns {*}
 */
function resolvePromise(promise, returnValue, resolve, reject) {
  if (promise === returnValue) {
    return reject(new TypeError('cycle reference'))
  }
  let isUsed  // isUsed有什么用？
  if (returnValue !== null && (typeof returnValue === 'object' || typeof returnValue === 'function')) {
    try {
      let then = returnValue.then
      if (typeof then === 'function') {
        // 若returnValue是一个promise实例，
        // 需执行完其内部的then链，才能修改value
        then.call(returnValue, innerValue => {
          if (isUsed) return
          isUsed = true
          resolvePromise(promise, innerValue, resolve, reject)
        }, innerReason => {
          if (isUsed) return
          isUsed = true
          reject(innerReason)
        })
      } else {
        // 若returnValue只是一个普通object，直接修改value
        resolve(returnValue)
      }
    } catch (e) {
      if (isUsed) return
      isUsed = true
      reject(e)
    }
  } else {
    resolve(returnValue)
  }
}

// check
const customPromise = myPromise
// const customPromise = Promise

const p = new customPromise((resolve, rejected) => {
  const p2 = new customPromise((resolve, rejected) => {
    resolve(2)
  })
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
