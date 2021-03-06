console.log('1');
const p1 = new Promise(function (resolve) {
  console.log('2');
  resolve();
}).then(function () {
  console.log('3')
  p1.then(function () {
    console.log('xx')
  })
}).then(function () {
  console.log('3x')
  p1.then(function () {
    console.log('xxx')
  })
})

p1.then(function () {
  console.log('4')
}).then(function () {
  console.log('4x')
})

setTimeout(function () {
  console.log('5');

  setTimeout(function () {
    console.log('15')
  })

  const p2 = new Promise(function (resolve) {
    console.log('6');
    resolve();
  })
    .then(function () {
      console.log('7')

      setTimeout(function () {
        console.log('14')
      })

    })
    .then(function () {
      console.log('8')
      p2.then(function () {
        console.log('18')
        p2.then(function () {
          console.log('19')
        })
      })
      setTimeout(function () {
        console.log('9 [end]')
      })
      p1.then(function () {
        console.log('10')
      })
      p2.then(function () {
        console.log('17')
      })
    })
    .then(function () {
      console.log('11')
    })

  p2.then(function () {
    console.log('16')
  })

  p1.then(function () {
    console.log('12')
  })

  p2.then(function () {
    console.log('16x')
  })
})

p1.then(function () {
  console.log('13')
}).then(function () {
  console.log('13x')
})


// 1,2,3,3x,4,13,xx,xxx,4x,13x,
// 5,6,7,12,8,10,11,16,18,17,19,
// 15,14,9

/**
 规则：
 1)先注册（微任务队列）先执行
 2).then.then方式：
 2.1)需依赖上一个执行完才注册下一个
 2.2)若上一个then内有return，则待其内部所有链式then执行完才注册
 3)多个p.then并行：同时注册
 4).then + p.then方式：
 4.1)先执行完.then，才注册p.then
 4.2).then内的p.then排在外部p.then后面注册
 *
 * */
