// 原型链继承
function Father(){
  this.property = true;
  this.arr = [1, 2]
}
Father.prototype.getFatherValue = function(){
  return this.property;
}
function Son(prop){
  this.sonProperty = prop;
}

//继承 Father
Son.prototype = new Father(); //Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonValue = function(){
  return this.sonProperty;
}
var instance = new Son(false);
alert(instance.getFatherValue()); //true

console.log(instance instanceof(Son)) // true
console.log(instance instanceof(Father)) // true
console.log(Son.prototype.isPrototypeOf(instance)) // true
console.log(Father.prototype.isPrototypeOf(instance)) // true

// 原型链继承的缺点：
// 1.原型链中包含引用类型值的原型时，该引用类型值会被所有实例共享
// 2.创建子类型时，不能向超类型的构造函数传递参数

var _instance = new Son(false);
console.log(_instance.property);  //原参数property=false被父类覆盖
instance.arr.push(3);
console.log(instance.arr);  // [1, 2, 3]
console.log(_instance.arr);  // [1, 2, 3] 受影响
instance.property = false;
console.log(_instance.property);  // true 没影响
console.log(instance.property);
