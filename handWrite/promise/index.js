const PromiseCopy = function (fn) {
  this.info = {
    status: "pending",
    value: "",
  };

  const self = this;

  self.onFulfilledArr = []; // then函数里面的第一个回调函数的集合
  self.onRejectedArr = []; // then函数里面的第二个回调函数的集合

  // _resolve 是我们经常调用的resolve
  // 但是真正实现的应该是里面的resolve
  const _resolve = function (value) {
    // 这个函数得改变一下
    // PromiseCopy一旦被实例化，那么self就是实例本身了
    resolve(self, value);
  };

  // 此时我们就可以在resolve进行判断了
  const resolve = function (promise, value) {
    let ifexec = false;

    // 首先判断value是不是promise本身
    if (value === promise) {
      // 一定要用TypeError写 不然promises-aplus-tests跑不通
      // 切记这是第一个坑，promises-aplus-tests只认TypeError这种错误形式
      reject(new TypeError("A promise cannot be onFulfilled with itself."));
    }

    // value是一个thenable对象
    // 这个要Object.prototype.toString.call(value) === "[object Object]"判断
    // 不然resolve([])有问题，不知道是不是我实现问题
    if (
      value &&
      (Object.prototype.toString.call(value) === "[object Object]" ||
        typeof value === "function")
    ) {
      // var promise1 = Promise.resolve(dump).then(function () {
      //   return {
      //     then: (resolve, reject) => {
      //       setTimeout(() => {
      //         resolve({
      //           then: (resolve, reject) => {
      //             resolve("aa111a");
      //             throw "other";
      //           },
      //         });
      //       });
      //     },
      //   };
      // });

      // promise1.then(
      //   (res) => {
      //     console.log(res === "aa111a");
      //     console.log("aaa");
      //   },
      //   (res) => {
      //     console.log(res);
      //     console.log("error");
      //   }
      // );

      // 这里的try--catch一定要加 ，不然会promises-aplus-tests会一直报错，这是第三个大坑
      // 因为promises-aplus-test测试里面有这一条的
      // 看上面注释例子

      try {
        // 拿到then函数

        const then = value.then;

        // 如果then是一个函数则执行这个函数
        if (typeof then === "function") {
          // 为什么要.call(value, x, y) 你们可以自己试一下原生的Promise在这种情况下this指向的就是value,所以要绑定
          // 因为then我们已经拿出来了then = value.then,直接调用then(),this就指向的window
          // 为什么后面还需要绑定两个函数了
          // 根据原生的Promise可知，thenable中的then函数可以接受两个函数resolve，reject
          // 只有手动调用了resolve和reject才会执行后面的.then操作，具体大家自己操作下

          then.call(
            value,
            function (value) {
              if (ifexec) {
                return;
              }

              // ifexec这个一定要加，不然也会报200ms错误，第四个大坑
              // 目的是为了不让多次执行，语言无法表达看下面的例子
              // var promise1 = Promise.resolve(dump).then(function () {
              //   return {
              //     then: (resolve, reject) => {
              //       resolve("aa111a");
              //       resolve("aa111a");
              //     },
              //   };
              // });
              ifexec = true;
              resolve(promise, value);
            },
            function (value) {
              if (ifexec) {
                return;
              }

              ifexec = true;
              reject(value);
            }
          );

          return;
        }
      } catch (e) {
        if (ifexec) {
          return;
        }

        ifexec = true;
        reject(e);
      }
    }

    // 下面这一点非常的重要，是async,await 和一些插件比如saga的核心
    // 就是如果x是一个promise对象，那么then的执行取决于x的状态
    // 还有这一个判断一定要放在这里,不要和上面的换 不然promises-aplus-tests会报一个超过200ms的错误，切记这是第二个坑
    if (value && value instanceof PromiseCopy && value.then === promise.then) {
      // 将promise的onFulfilledArr给到value
      // 但是还没有那么简单我们要明白两点
      // 如果value这个promise已经不是pendding,我们给了他也没有用，所以需要直接调用
      if (value.info.status === "pending") {
        value.onFulfilledArr = self.onFulfilledArr;
        value.onRejectedArr = self.onRejectedArr;
      }

      // 如果value状态是onFulfilled
      if (value.info.status === "onRejected") {
        self.info.value = value.info.value;

        self.onRejectedArr.forEach((fn) => fn(value.info.value));
      }

      // 如果value状态是reject
      if (value.info.status === "onFulfilled") {
        self.info.value = value.info.value;

        self.onFulfilledArr.forEach((fn) => fn(value.info.value));
      }

      return;
    }

    // 如果是一个普通的值
    // 加这个判断是为了表示，只有在pendding状态下才会去执行
    // 状态已经变成onFulfilled之后就不能再去改变了
    // 符合PromiseA+中的2.1.2.1
    if (self.info.status === "pending") {
      self.info.status = "onFulfilled";
      self.info.value = value;
      self.onFulfilledArr.forEach((fn) => fn(value));
    }
  };

  // 和上面同理符合PromiseA+,2.1.3.1
  // reject没有resolve那么多规则，比较简单
  const reject = function (value) {
    if (self.info.status === "pending") {
      self.info.status = "onRejected";

      self.info.value = value;

      self.onRejectedArr.forEach((fn) => fn(value));
    }
  };

  // 此时fn调用的是_reoslve
  // 这个try catch主要是实现promiseCopy.prototype.catch
  try {
    fn(_resolve, reject);
  } catch (e) {
    setTimeout(() => {
      self.onRejectedArr.forEach((fn) => fn(e));
    });
  }
};
