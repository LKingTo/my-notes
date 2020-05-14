// this的绑定规则有四种：默认绑定，隐式绑定，显式绑定，new绑定.
// * 默认绑定
//     * 通常为独立函数调用，fn()
//     * 不能应用其他规则是使用
//     * 严格模式 - 指向undefined
//     * 非严格模式 - 指向window
// * 隐式绑定
//     * XXX.fn()方式调用
//     * 某个对象上触发的函数调用，存在上下文对象
//     * 绑定指向该上下文对象
//     * 注意隐式绑定丢失，变为默认绑定
//         * 回调函数
// * 显示绑定（硬绑定）
//     * 通过call、apply、bind方式，指向第一个参数对象
//     * call、apply会执行对应的函数，bind不会
//     * 注意显示绑定丢失，变为默认绑定
//         * null、undefined传入call、apply、bind时
// * new绑定
//     * new fn()方式调用函数
//     * new的内部操作：
//         * 创造一个新对象
//         * 将构造函数的作用域赋值给新对象（即this指向该对象）
//         * 执行构造函数中的代码
//         * 返回新对象

// 箭头函数：
// * 函数体内的this对象，继承自外层代码块的this
// * 不可当左构造函数，不能new
// * 没有arguments对象，用rest参数替代
// * 不能用yield命令，不能用作Generator函数
// * 没有自己的this，即不能用call、apply、bind绑定

// 综合判断：
// 1、函数是否在 new 中调用(new绑定)，如果是，那么 this 绑定的是新创建的对象【前提是构造函数中没有返回对象或者是function，否则this指向返回的对象/function】。
// 2、函数是否通过 call,apply 调用，或者使用了 bind (即硬绑定)，如果是，那么this绑定的就是指定的对象。
// 3、函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this 绑定的是那个上下文对象。一般是 obj.foo()
// 4、如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到 undefined，否则绑定到全局对象。
// 5、如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind, 这些值在调用时会被忽略，实际应用的是默认绑定规则。
// 6、箭头函数没有自己的 this, 它的this继承于上一层代码块的this。

// 典型题目
var number = 5;
var obj = {
  number: 3,
  fn1: (function () {  // 定义obj时执行
    var number; // number -> undefined
    this.number *= 2; // this.number -> window.number => 5*2 => 10
    number = number * 2; // Number(undefined) => NaN, NaN*2 => NaN
    number = 3; // number -> 3
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    }
  })()
}
var fn1 = obj.fn1;
fn1.call(null);  // num=10,10*2=20, 打印num为10,number为3*3=9
obj.fn1(); // num=>obj.number=>3,3*2=6,打印3; 9*3=27,打印27
console.log(window.number); // 20
// 最终输出：10、9、3、27、20
