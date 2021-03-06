const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  status = PENDING
  value = undefined
  onFulfilledArray = []
  onRejectedArray = []

  constructor(executor) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      this._reject.bind(this, e)
    }
  }

  _resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onFulfilledArray.forEach(fn => fn(value))
    }
  }

  _reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.value = reason
      this.onRejectedArray.forEach(fn => fn(reason))
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }

    const self = this
    let newPromise
    switch (self.status) {
      case FULFILLED:
        newPromise = new MyPromise((newResolve, newReject) => {
          self._handler(onFulfilled, self.value, newResolve, newReject)
        })
        break
      case REJECTED:
        newPromise = new MyPromise((newResolve, newReject) => {
          self._handler(onRejected, self.value, newResolve, newReject)
        })
        break
      case PENDING:
        newPromise = new MyPromise((newResolve, newReject) => {
          self.onFulfilledArray.push(value => {
            self._handler(onFulfilled, value, newResolve, newReject)
          })
          self.onRejectedArray.push(reason => {
            self._handler(onRejected, reason, newResolve, newReject)
          })
        })
        break
      default:
    }
    return newPromise
  }

  _handler(handler, value, resolve, reject) {
    setTimeout(() => {
      try {
        const newResolveValue = handler(value)
        this._handleNewPromise(newResolveValue, resolve, reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  // 处理新promise的状态
  _handleNewPromise(value, resolve, reject) {
    const self = this
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      // 若returnValue是一个promise实例，需执行完其内部的then链，才能修改value
      try {
        const then = value.then
        if (typeof then === 'function') {
          then.call(value, innerValue => {
            self._handleNewPromise(innerValue, resolve, reject)
          }, innerReason => {
            reject(innerReason)
          })
        } else {
          resolve(value)
        }
      } catch(e) {
        reject(e)
      }
    } else {
      resolve(value)
    }
  }
}


const p = new MyPromise((resolve, rejected) => {
  const p2 = new MyPromise((resolve, rejected) => {
    resolve(2)
  })
  resolve(p2)
})
p.then(res => {
  // return () => {}   // 返回该对象
  // return {then: ''}
  // return p
  // return '33'
  return new MyPromise((resolve, rejected) => {
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
