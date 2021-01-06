// 寄生组合式继承
// 使用寄生式继承来继承超类型的原型，然后再将结果指定给予类型的原型
function Parent(name){
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function(){
  console.log(this.name);
}

// 借用构造函数方式，调用超类属性
function Child(name,age){
  Parent.call(this,name);
  this.age = age;
}
Child.prototype.childFn = function() {
  console.log(this.age)
}

// Child.prototype = new Parent(); // 原型链方式换成下面
function prototype(child,parent){
  var prototype = Object.create(parent.prototype);
  // 将寄生结果指向子类的原型
  prototype.constructor = child;
  child.prototype = prototype;
}
prototype(Child,Parent);

var child1 = new Child('xiaopao', 18);
child1.colors.push('pink')
var child2 = new Child('xiao', 28);
console.log(child1.colors); // ["red", "blue", "green", "pink"]
console.log(child2.colors); // ["red", "blue", "green"]
// child1.childFn()    // 子类原型被覆盖，undefined
