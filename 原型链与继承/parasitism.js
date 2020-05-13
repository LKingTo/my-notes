// 寄生式继承  可以理解为在原型式继承的基础上增加一些函数或属性
// 缺点：跟借用构造函数一样，每次创建对象都会创建一遍方法

var ob = {
  name: 'xiaopao',
  friends: ['lulu','huahua']
}

function CreateObj(o){
  function F(){};  // 创建一个构造函数F
  F.prototype = o;
  return new F();
}

// 上面CreateObj函数 在ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的 , 看下面代码
var ob1 = CreateObj(ob);
var ob2 = Object.create(ob);
console.log(ob1.name); // xiaopao
console.log(ob2.name); // xiaopao

function CreateOb(o){
  var newob = CreateObj(o); // 创建对象 或者用 var newob = Object.create(ob)
  newob.sayName = function(){ // 增强对象
    console.log(this.name);
  }
  return newob; // 指定对象
}

var p1 = CreateOb(ob);
var p2 = CreateOb(ob);
p1.sayName(); // xiaopao
p1.friends.push('p1');
console.log(p1.friends); //
console.log(p2.friends);
