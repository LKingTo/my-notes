// 经典继承 - 借用构造函数
// 缺点：
// 1.继承方法都在构造函数中定义，函数无法复用
// 2.超类型中定义的方法，对子类型为不可见

function Father(name) {
  this.name = name
  this.colors = [name, "red","blue"];
  // 这里定义的方法，每次子类创建实例都会创建一遍，无法复用
}
Father.prototype.fatherFn = function () {
  console.log('Father fatherFn', this.colors);
}

function Son(name) {
  Father.call(this, name); // 继承了Father,且向父类型传递参数
}

var instance1 = new Son('小明');
instance1.colors.push('black');
console.log(instance1.colors);  // ["小明", "red", "blue", "black"]

var instance2 = new Son('小方');
console.log(instance2.colors); // ["小方", "red", "blue"] 可见引用类型值是独立的

console.log(instance1 instanceof(Son)) // true
console.log(instance1 instanceof(Father)) // false
console.log(Son.prototype.isPrototypeOf(instance1)) // true
console.log(Father.prototype.isPrototypeOf(instance1)) // false

// 缺点：超类型中定义的方法，对子类型为不可见
instance1.fatherFn()  // instance1.fatherFn is not a function
