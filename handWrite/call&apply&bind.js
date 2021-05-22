// 实现call函数
Function.prototype.myCall = function (context) {
  let self = this;
  if (typeof self !== 'function') {
    return new TypeError('error')
  }
  // 截取非首参数
  let args = [...arguments].slice(1);
  // 若无context,赋值给window
  context = context || window;
  // 临时添加方法
  context.fn = self;
  let result = context.fn(args);
  // 删除属性
  delete context.fn;
  return result;
}


// 实现apply
Function.prototype.myApply = function(context) {
  let self = this;
  if (typeof self !== 'function') {
    return new TypeError('error')
  }
  let args = arguments[1];
  if (args && !Array.isArray(args)) {
    return new TypeError('the second argument must instanceOf Array')
  }
  context = context || window;
  context.fn = self;
  let result = context.fn(args);
  delete context.fn;
  return result;
}

// 实现bind
Function.prototype.myBind = function(context) {
  let self = this;
  if (typeof self !== 'function') {
    return new TypeError('error')
  }
  let args = [...arguments].slice(1);  // 预定义参数
  return function Fn() {
    let innerArgs = [...arguments];
    let finalArgs = args.concat(innerArgs);
    return self.apply(this instanceof Fn ? this : context, finalArgs);
  }
}
