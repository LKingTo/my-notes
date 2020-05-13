// 原型链继承
function Father(){
  this.property = true;
}
Father.prototype.getFatherValue = function(){
  return this.property;
}
function Son(){
  this.sonProperty = false;
}

//继承 Father
Son.prototype = new Father(); //Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonVaule = function(){
  return this.sonProperty;
}
var instance = new Son();
alert(instance.getFatherValue()); //true

// 原型链继承的缺点：
// 1.原型链中包含引用类型值的原型时，该引用类型值会被所有实例共享
// 2.创建子类型时，不能向超类型的构造函数传递参数

console.log(instance instanceof(Son)) // true
console.log(instance instanceof(Father)) // true
console.log(Son.prototype.isPrototypeOf(instance)) // true
console.log(Father.prototype.isPrototypeOf(instance)) // true
