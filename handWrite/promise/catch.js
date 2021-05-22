// 实现Promise.catch
// catch是 then 方法的语法糖，只接受 rejected 态的数据

Promise.prototype.promiseCatch = function(onCatch) {
  return this.then(null, onCatch)
}

let p = new Promise((resolve, reject) => {
  // resolve(1)
  reject('err')
  throw new Error('an Error')
}).then(res => {
  console.log('[res]', res) // [res] 1
  return res
}, err => {
  console.error('[err]', err)
  return err  // [err] err
}).promiseCatch(c => {
  console.log('[catch]', c)  // [catch] undefined
  // throw new Error('error in catch')
  return 3  // finally的return值对.then无效
}).then(r => {
  console.log('[after catch then r]', r)  // [after catch then r] 1
}, e => {
  console.log('[after catch then e]', e)  // [after catch then e] err
})
