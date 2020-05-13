// 寄生组合式继承
function Parent(name){
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function(){
  console.log(this.name);
}

function Child(name,age){
  Parent.call(this,name);
  this.age = age;
}

function CreateObj(o){
  function F(){};
  F.prototype = o;
  return new F();
}

// Child.prototype = new Parent(); // 这里换成下面
function prototype(child,parent){
  var prototype = CreateObj(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
prototype(Child,Parent);

var child1 = new Child('xiaopao', 18);
console.log(child1);
