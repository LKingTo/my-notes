const getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000))

const test = async () => {
  const data1 = await getData()
  console.log('data1', data1)
  const data2 = await getData()
  console.log('data2', data2)
  return 'success'
}

// test().then(res => console.log(res))

function* testG() {
  const data1 = yield getData()
  console.log('data1', data1)
  const data2 = yield getData()
  console.log('data2', data2)
  return 'success'
}

// let g = testG()
// let g1 = g.next('首次调用的这个参数无用')
// g1.value.then(res => console.log('g1', res))
// let g2 = g.next('这个参数赋值给data1变量')
// g2.value.then(res => console.log('g2', res))
// let g3 = g.next('这个参数赋值给data2变量')

/**
 * 实现async/await函数（自执行的generator函数）
 * @param generatorFunc
 * @returns {function(): Promise<unknown>}
 */
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function() {
    // 先调用 generator 函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments);
    // 返回一个 promise 因为外部是用 .then 的方式 或者 await 的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个 step 函数，用来一步一步的跨过 yield 的阻碍
      // key 有 next 和 throw 两种取值，分别对应了 gen 的 next 和 throw 方法
      // arg 参数则是用来把 promise resolve 出来的值交给下一个 yield
      function step(key, arg) {
        let generatorResult;

        // 这个方法需要包裹在 try catch 中
        // 如果报错了 就把 promise 给 reject 掉 外部通过 .catch 可以获取到错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult;

        if (done) {
          // 如果已经完成了，就直接 resolve 这个 promise
          // 这个 done 是在最后一次调用 next 后才会为 true
          // 以本文的例子来说，此时的结果是 { done: true, value: 'success' }
          // 这个 value 也就是 generator 函数最后的返回值
          return resolve(value);
        } else {
          // 除了最后结束的时候外，每次调用 gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构
          // 这里要注意的是 Promise.resolve 可以接受一个 promise 为参数
          // 并且这个 promise 参数被 resolve 的时候，这个 then 才会被调用
          return Promise.resolve(
            // 这个 value 对应的是 yield 后面的 promise
            value
          ).then(
            // value 这个 promise 被 resolve 的时候，就会执行 next
            // 并且只要 done 不是 true 的时候，就会递归的往下解开 promise，对应
            // gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时 done 为 true 了，整个 promise 被 resolve 了
            //      // 最外部的 test().then(res => console.log(res)) 的 then 就开始执行了
            //    })
            // })
            function onResolve(val) {
              step('next', val);
            },
            // 如果 promise 被 reject 了，就再次进入 step 函数
            // 不同的是，这次的 try catch 中调用的是 gen.throw(err)
            // 那么自然就被 catch 到，然后把 promise 给 reject 掉啦
            function onReject(err) {
              step('throw', err);
            }
          );
        }
      }
      step('next');
    });
  };
}

const ret = asyncToGenerator(testG)
ret().then(res => {
  console.log('res', res)
})
