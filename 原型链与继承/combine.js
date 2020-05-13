// 组合继承
// 结合原型链 + 借用构造函数

function Father(name){
  this.name = name;
  this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
  alert(this.name);
};
function Son(name,age){
  Father.call(this,name);//继承实例属性，第一次调用Father()
  this.age = age;
}
Son.prototype = new Father();//继承父类方法,第二次调用Father()
Son.prototype.sayAge = function(){
  alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance2 = new Son("zhai",10);
console.log(instance2.colors);//"red,blue,green"
instance2.sayName();//zhai
instance2.sayAge();//10


console.log(instance1 instanceof(Son)) // true
console.log(instance1 instanceof(Father)) // true
console.log(Son.prototype.isPrototypeOf(instance1)) // true
console.log(Father.prototype.isPrototypeOf(instance1)) // true

