// 原型继承 Object.create

var person = {
  friends : ["Van","Louis","Nick"]
};
var anotherPerson = Object.create(person);
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.friends.push("Style");

alert(person.friends); //"Van,Louis,Nick,Rob,Style"

// 缺点：引用类型的值被共享了
