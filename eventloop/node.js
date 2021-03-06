console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})

process.nextTick(function () {
  console.log('6');
})

new Promise(function (resolve) {
  console.log('7');
  resolve();
})
  .then(function () {
    console.log('8')
  })

setTimeout(function () {
  console.log('9');

  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })

  process.nextTick(function () {
    console.log('10');
  })
})

// node11以下，事件循环，先执行完宏任务队列，再执行微任务队列
// 1,7,
// 6,8,
// 2,4,9,11
// 3,10,5,12  // process.nextTick优先级高于promise.then

// node11+，事件循环，每执行完一个宏任务，立即执行对应微任务队列
// 1,7
// 6,8
// 2,4,3,5
// 9,11,10,12
