/** 原始数据类型 **/
// 布尔值
var isDone = false;
var createdByBoolean = Boolean(1);
// 数值
var decLiteral = 6;
// 字符串
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
// 空值 - 可以赋值null或undefined
function alertName() {
    alert('My name is Tom');
}
var unusable = undefined;
unusable = null;
// Null 和 Undefined，可以赋值给任意类型变量
var u = undefined;
var n = null;
var num = u; // undefined赋值给number类型
// num = unusable      // void类型不能赋值给其他类型
/** 任意类型 any **/
var myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// 在任意值上访问任何属性都是允许的：
var anyThing = 'hello';
// console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);
var something; // 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
something = 'seven';
something = 7;
// something.setName('Tom');
/** 类型推论 **/
// let myFavoriteNumber = 'seven'; // 在没有明确的指定类型的时候推测出一个类型，这就是类型推论
// myFavoriteNumber = 7;
