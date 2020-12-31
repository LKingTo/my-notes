/**
 * https://github.com/forthealllight/blog/issues/4
 * */

const STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

// 1.v1.0 初始版本myPromise
function myPromise1(constructor) {
  let self = this;
  self.status = STATUS.PENDING;
  self.value = undefined
  self.reason = undefined

  function resolve(value) {
    if (self.status === STATUS.PENDING) {
      self.value = value;
      self.status = STATUS.RESOLVED;
    }
  }

  function rejected(reason) {
    if (self.status === STATUS.PENDING) {
      self.reason = reason;
      self.status = STATUS.REJECTED;
    }
  }

  try {
    constructor(resolve, rejected)
  } catch (e) {
    rejected(e)
  }
}

myPromise1.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  console.log('handle then: ', self.status)
  switch (self.status) {
    case STATUS.RESOLVED:
      onFullfilled(self.value);
      break;
    case STATUS.REJECTED:
      onRejected(self.reason)
      break;
    default:
  }
}

// test myPromise1
/**
 const p1 = new myPromise1((resolve, rejected) => {
  resolve(1);
})
 p1.then(res => { console.log('p1', res)})
 */

// myPromise1无法处理异步的resolve
/**
 const p2 = new myPromise1((resolve, rejected) => {
  setTimeout(() => {
    resolve(1);
    console.log('do setTimeout')
  }, 1500)
})
 p2.then(res => { console.log('p2', res)})   // 无输出
 */

/**
 * 2.v2.0基于观察模式实现
 * 为了处理异步resolve，我们修改myPromise的定义，
 * 用2个数组onFullfilledArray和onRejectedArray来保存异步的方法。
 * 在状态发生改变时，一次遍历执行数组中的方法
 */
function myPromise2(constructor) {
  let self = this;
  self.status = STATUS.PENDING;
  self.value = undefined
  self.reason = undefined
  self.onFullfilledArray = [];
  self.onRejectedArray = [];

  function resolve(value) {
    if (self.status === STATUS.PENDING) {
      self.value = value;
      self.status = STATUS.RESOLVED;
      self.onFullfilledArray.forEach(f => f())
      //如果状态从pending变为resolved，
      //那么就遍历执行里面的异步方法
    }
  }

  function rejected(reason) {
    if (self.status === STATUS.PENDING) {
      self.reason = reason;
      self.status = STATUS.REJECTED;
      self.onRejectedArray.forEach(f => f())
    }
  }

  try {
    constructor(resolve, rejected)
  } catch (e) {
    rejected(e)
  }
}

myPromise2.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  console.log('handle then: ', self.status)
  switch (self.status) {
    case STATUS.PENDING:
      self.onFullfilledArray.push(() => {
        onFullfilled(self.value)
      })
      self.onRejectedArray.push(() => {
        onRejected(self.reason)
      })
      break;
    case STATUS.RESOLVED:
      onFullfilled(self.value);
      break;
    case STATUS.REJECTED:
      onRejected(self.reason);
      break;
    default:
  }
}

// test myPromise2
/**
 const p3 = new myPromise2((resolve, rejected) => {
  setTimeout(() => {
    resolve(1);
    console.log('do setTimeout')
  }, 1500)
})
 p3.then(res => { console.log('p3', res)}) // 异步输出成功，p3 1
 */

/**
 p3.then(res => { console.log('p3', res)})
 .then(() => { console.log('链式调用1') })
 .then(() => { console.log('链式调用2') })   // 报错，无法链式调用
 */

/**
 * 3.v3.0then方法实现链式调用
 * 要通过then方法实现链式调用，那么也就是说then方法每次调用需要返回一个primise,
 * 同时在返回promise的构造体里面，增加错误处理部分
 */
function myPromise3(constructor) {
  let self = this;
  self.status = STATUS.PENDING;
  self.value = undefined
  self.reason = undefined
  self.onFullfilledArray = [];
  self.onRejectedArray = [];

  function resolve(value) {
    if (self.status === STATUS.PENDING) {
      self.value = value;
      self.status = STATUS.RESOLVED;
      self.onFullfilledArray.forEach(f => f())
      //如果状态从pending变为resolved，
      //那么就遍历执行里面的异步方法
    }
  }

  function rejected(reason) {
    if (self.status === STATUS.PENDING) {
      self.reason = reason;
      self.status = STATUS.REJECTED;
      self.onRejectedArray.forEach(f => f())
    }
  }

  try {
    constructor(resolve, rejected)
  } catch (e) {
    rejected(e)
  }
}

myPromise3.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  let promise2;
  console.log('handle then: ', self.status)
  switch (self.status) {
    case STATUS.PENDING:
      promise2 = new myPromise3((resolve, reject) => {
        self.onFullfilledArray.push(() => {
          try {
            let temple = onFullfilled(self.value)   // 获得返回值
            resolve(temple)
          } catch (e) {
            reject(e)
          }
        })
        self.onRejectedArray.push(() => {
          try {
            let temple = onRejected(self.reason)
            reject(temple)
          } catch (e) {
            reject(e)
          }
        })
      })
      break;
    case STATUS.RESOLVED:
      promise2 = new myPromise3((resolve, reject) => {
        try {
          let temple = onFullfilled(self.value)   // 获得返回值
          resolve(temple)
        } catch (e) {
          reject(e)
        }
      })
      break;
    case STATUS.REJECTED:
      promise2 = new myPromise3((resolve, reject) => {
        try {
          let temple = onRejected(self.reason)
          reject(temple)
        } catch (e) {
          reject(e)
        }
      })
      break;
    default:
  }
  return promise2;
}

// test myPromise3
const p4 = new myPromise3((resolve, rejected) => {
  setTimeout(() => {
    resolve(1);
    console.log('do setTimeout')
  }, 1500)
})
p4.then(res => { console.log('p4', res)})
  .then(() => { console.log('链式调用1') })
  .then(() => { console.log('链式调用2') })   // 正常链式输出


// var p = new myPromise3((resolve, reject) => { resolve("初始化promise") })
// p.then(() => {
//   return new myPromise3((resolve, reject) => {
//     resolve("then里面的promise返回值")
//   })
// })
//   .then((x) => {
//     console.log(x)
//   })
