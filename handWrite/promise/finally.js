// 实现Promise.finally
// 不管promise对象最后状态如何，都会执行指定的回调操作
// finally可在链路任意段的调用
// finally的调用其返回值不会影响原.then链的执行效果

Promise.prototype.promiseFinally = function (onFinally) {
  if (typeof onFinally !== 'function')
    return this.then();
  let P = this.constructor;
  return this.then(
    value => P.resolve(onFinally()).then(() => value),
    reason => P.reject(onFinally()).then(() => {throw reason})
  );
};

let p = new Promise((resolve, reject) => {
  // resolve(1)
  reject('err')
}).then(res => {
  console.log('[res]', res) // [res] 1
  return res
}, err => {
  console.error('[err]', err)
  return err  // [err] err
}).promiseFinally(f => {
  console.log('[finally]', f)  // [finally] undefined
  return 3  // finally的return值对.then无效
}).then(r => {
    console.log('[after finally then r]', r)  // [after finally then r] 1
  }, e => {
    console.log('[after finally then e]', e)  // [after finally then e] err
  })
