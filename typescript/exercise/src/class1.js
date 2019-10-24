/** 类 Class
 *  类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
    对象（Object）：类的实例，通过 new 生成
    面向对象（OOP）的三大特性：封装、继承、多态
    封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
    继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
    多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
    存取器（getter & setter）：用以改变属性的读取和赋值行为
    修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
    抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
    接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
 ***/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** ES6
 *  class、constructor，定义类、定义构造函数
 *  new 生产实例
 *  extends继承，super调用父类的构造函数和方法
 *  get/set 存取器
 *  static 静态方法，直接通过类来调用，实例无法调用
 **/
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.isAnimal = function (a) {
        return a instanceof Animal;
    };
    Animal.prototype.sayHi = function () {
        return "My name is " + this.name;
    };
    Object.defineProperty(Animal.prototype, "name", {
        get: function () {
            return 'Jack';
        },
        set: function (value) {
            console.log('setter: ' + value);
        },
        enumerable: true,
        configurable: true
    });
    return Animal;
}());
var a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
console.log(a.sayHi()); // Meow, My name is Jack
Animal.isAnimal(a); // true
// a.isAnimal(a); // TypeError: a.isAnimal is not a function
// 继承
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.sayHi = function () {
        return 'Meow, ' + _super.prototype.sayHi.call(this); // 调用父类的 sayHi()
    };
    return Cat;
}(Animal));
var c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
/*** ES7
 *  1.实例的属性可以直接在类里面定义
 *  2.使用 static 定义一个静态属性
 ***/
var Animal1 = /** @class */ (function () {
    function Animal1() {
        this.name = 'Jack';
        // ...
    }
    Animal1.num = 42;
    return Animal1;
}());
var aa = new Animal1();
console.log(aa.name); // Jack
console.log(Animal1.num); // 42
/*** TypeScript中类的用法
 *  1.三种访问修饰符：
 *  public - 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
 *  private - 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 *  protected - 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
 *
 *  2.抽象类 - 不允许被实例化的
 *  abstract
 *      1）抽象类不允许被实例化
 *      2）必须实现继承的抽象方法
 ***/
var Animal2 = /** @class */ (function () {
    // private name;   //外部、子类都都不可访问
    // protected name;    //子类可以访问
    function Animal2(name) {
        this.name = name;
    }
    return Animal2;
}());
var Cat2 = /** @class */ (function (_super) {
    __extends(Cat2, _super);
    function Cat2(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    return Cat2;
}(Animal2));
var aaa = new Animal2('Jack');
console.log(aaa.name); // Jack
aaa.name = 'Tom';
console.log(aaa.name); // Tom
// 抽象
var Animal3 = /** @class */ (function () {
    function Animal3(name) {
        this.name = name;
    }
    return Animal3;
}());
// let b = new Animal3('Jack'); // [error:] 不允许被实例化
var Cat3 = /** @class */ (function (_super) {
    __extends(Cat3, _super);
    function Cat3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat3.prototype.eat = function () {
        console.log(this.name + " is eating.");
    };
    Cat3.prototype.sayHi = function () {
        console.log("Meow, My name is " + this.name);
    };
    return Cat3;
}(Animal3));
var cat3 = new Cat3('Tom');
// 给类加上 TypeScript 的类型
var Animal4 = /** @class */ (function () {
    function Animal4(name) {
        this.name = name;
    }
    Animal4.prototype.sayHi = function () {
        return "My name is " + this.name;
    };
    return Animal4;
}());
var d = new Animal4('Jack');
console.log(d.sayHi()); // My name is Jack
