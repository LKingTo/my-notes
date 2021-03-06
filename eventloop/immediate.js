const fs = require('fs')

/** 同时出现setImmediate、setTimeout */

// 1、script里同时出现setImmediate、setTimeout
// 根据script实际执行时间during而定，node的delay默认1s：
// during > delay，timer超时，先setTimeout
// during < delay，timer超时，先setImmediate
function foo1() {
  setTimeout(() => {
    console.log('timeout')
  })
  setImmediate(() => {
    console.log('immediate')
  })
}

// 2、I/O里同时出现setImmediate、setTimeout
// 因为本次循环check阶段未执行，故先先setImmediate
function foo2() {
  fs.readdir('./eventloop', (err, files) => {
    if (err) throw err
    setTimeout(() => {
      console.log('timeout')
    })
    setImmediate(() => {
      console.log('immediate')
    })
  })
}


// 3、setTimeout里同时出现setImmediate、setTimeout
// 当前为timers阶段，本次check阶段未执行，内部setTimeout在下一次循环的队列
// 故先执行setImmediate
function foo3() {
  setTimeout(() => {
    setTimeout(() => {
      console.log('timeout')
    })
    setImmediate(() => {
      console.log('immediate')
    })
  })
}

// 4、setImmediate里同时出现setImmediate、setTimeout
// 当前为check阶段，内部setImmediate、setTimeout都在下次循环的队列里
// 故与script的情况一样，视timer是否超时而定
function foo4() {
  setImmediate(() => {
    setTimeout(() => {
      console.log('timeout')
    })
    setImmediate(() => {
      console.log('immediate')
    })
  })
}

// 5、promise里同时出现setImmediate、setTimeout
// promise不在node的eventLoop任意阶段，但在一阶段结束后立即执行
function foo5() {
  new Promise(resolve => {
    resolve()
  }).then(() => {
    setTimeout(() => {
      console.log('timeout')
    })
    setImmediate(() => {
      console.log('immediate')
    })
  })
}

// 6、nextTick里同时出现setImmediate、setTimeout
// 同promise一样
function foo6() {
  process.nextTick(() => {
    setTimeout(() => {
      console.log('timeout')
    })
    setImmediate(() => {
      console.log('immediate')
    })
  })
}

function fooM1(isTick) {
  fs.readdir('./eventloop', (err, files) => {
    if (err) throw err
    if (isTick)
      foo6()
    else
      foo5()
  })
}

function fooM2(isTick) {
  setImmediate(() => {
    if (isTick)
      foo6()
    else
      foo5()
  })
}

function fooM3(isTick) {
  setTimeout(() => {
    if (isTick)
      foo6()
    else
      foo5()
  })
}

// fooM1(true)
// fooM2(true)
fooM3(true)

