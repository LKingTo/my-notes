// 经典继承 - 借用构造函数
// 缺点：
// 1.方法都在构造函数中定义，函数无法复用
// 2.超类型中定义的方法，对子类型为不可见

function Father() {
  this.colors = ["red","blue","green"];
}
function Son() {
  Father.call(this); // 继承了Father,且向父类型传递参数
}

var instance1 = new Son();
instance1.colors.push('black');
console.log(instance1.colors);  // "red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors); // "red,blue,green" 可见引用类型值是独立的

console.log(instance1 instanceof(Son)) // true
console.log(instance1 instanceof(Father)) // false
console.log(Son.prototype.isPrototypeOf(instance1)) // true
console.log(Father.prototype.isPrototypeOf(instance1)) // false
