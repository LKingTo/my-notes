/**
 * Proxy语法：
 * let p = new Proxy(target, handler);
 * target: 用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
 * handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数。
 * */

// 基础实例
/**
let handler = {
  get: (target, name) => {
    return name in target ? target[name] : 37;
  }
};

let p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;
console.log(p.a, p.b); // 1 undefined
console.log('c' in p, p.c);    // false, 37
*/

// 无操作转发
// let target = {};
// let p = new Proxy(target, {});
// p.a = 37;
//
// console.log(target.a); // 37

let target = {
  name:"小明",
  age:15
};
let handler = {};
let pro = new Proxy(target,handler);

console.log(pro.name);
//结果为 小明

pro.name = "小红";
console.log(pro.name);  // 小红
console.log(target.name); // 小红
