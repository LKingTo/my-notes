// 实现一个promise 简单版
// Promise/A+规范：
//
// 三种状态pending| fulfilled(resolved) | rejected
// 当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态
// 当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。
//
// 必须有一个then异步执行方法，then接受两个参数且必须返回一个promise

const PENDING = 'pending'
const FULFILLED = 'resolved'
const REJECTED = 'rejected'

function xPromise(constructor) {
  let self = this
  self.status = PENDING
  self.value = undefined
  self.reason = undefined

  function resolve(value) {
    if (self.status === PENDING) {
      self.value = value
      self.status = FULFILLED
    }
  }

  function reject(value) {
    if (self.status === PENDING) {
      self.reason = value
      self.status = REJECTED
    }
  }

  try {
    constructor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

xPromise.prototype.then = function(onResolved, onRejected) {
  let self = this
  switch(self.status) {
    case FULFILLED:
      onResolved(self.value)
      break
    case REJECTED:
      onRejected(self.reason)
      break
    default:
  }
}

const p = new xPromise(function(resolve, reject) {
  // setTimeout(() => { // 异步未支持
    resolve('success')
  // })
})
p.then(function (res) {
  console.log(res)  // success
})

const pp = new xPromise(function(resolve, reject) {
  resolve(new xPromise(function(res, rej) {
    res('ss')
  }))
})
pp.then(function (res) {
  console.log(res)  // xPromise {reason: undefined,status: "resolved",value: "ss"}
  res.then(function (r) {
    console.log(r)  // ss
  })
})
