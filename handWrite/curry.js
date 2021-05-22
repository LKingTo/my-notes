// 实现一个柯里化函数
// 柯里化：把接受多个参数的函数变换为接受单一参数的函数，返回接受余下参数的新函数
// 例：实现sum(1)(2)(3)返回结果为1、2、3之和

function curry(fn, args = []) {
  return function () {
    let rest = [...args, ...arguments];
    if (rest.length < fn.length) {  // fn.length,返回函数【第一个有默认值参数】之前的形参数量
      return curry.call(this, fn, rest)
    } else {
      return fn.apply(this, rest)
    }
  }
}

function sum(a, b, c) {
  return [...arguments].reduce((prev, next) => prev + next);
}

function curry1(fn) {
  let args = Array.prototype.slice.call(arguments, 1)
  return function() {
    const _args = args .concat([...arguments])
    return fn.apply(this, _args)
  }
}

// console.log(curry1(sum, 1, 2)(3, 4, 5)(6))

// 支持多参数传递
function progressCurrying(fn, args) {
  var _this = this
  var len = fn.length;
  var args = args || [];
  return function() {
    var _args = Array.prototype.slice.call(arguments);
    Array.prototype.push.apply(args, _args);
    // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
    if (_args.length < len) {
      return progressCurrying.call(_this, fn, _args);
    }
    // 参数收集完毕，则执行fn
    return fn.apply(this, _args);
  }
}

// console.log(progressCurrying(sum, 1, 2)(3)(4))
// console.log(curry(sum, 1, 2)(3)(4))

/** 实现一个add方法，使计算结果能够满足如下预期：
 * add(1)(2)(3) = 6;
 * add(1, 2, 3)(4) = 10;
 * add(1)(2)(3)(4)(5) = 15;
 */

function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function() {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  }
  return _adder;
}

console.log(add(1)(2)(3))          // 6
console.log(add(1, 2, 3)(4))             // 10
console.log(add(1)(2)(3)(4)(5))          // 15
console.log(add(2, 6)(1))


