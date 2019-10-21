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

/** ES6
 *  class、constructor，定义类、定义构造函数
 *  new 生产实例
 *  extends继承，super调用父类的构造函数和方法
 *  get/set 存取器
 *  static 静态方法，直接通过类来调用，实例无法调用
 **/

class Animal {
    constructor(name) {
        this.name = name;
    }
    static isAnimal(a) {
        return a instanceof Animal;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
console.log(a.sayHi()); // Meow, My name is Jack
Animal.isAnimal(a); // true
// a.isAnimal(a); // TypeError: a.isAnimal is not a function

// 继承
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom


/*** ES7
 *  1.实例的属性可以直接在类里面定义
 *  2.使用 static 定义一个静态属性
 ***/
class Animal1 {
    name = 'Jack';
    static num = 42;
    constructor() {
        // ...
    }
}

let aa = new Animal1();
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

class Animal2 {
    public name;
    // private name;   //外部、子类都都不可访问
    // protected name;    //子类可以访问
    public constructor(name) {
        this.name = name;
    }
}

class Cat2 extends Animal2 {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}

let aaa = new Animal2('Jack');
console.log(aaa.name); // Jack
aaa.name = 'Tom';
console.log(aaa.name); // Tom

// 抽象
abstract class Animal3 { //抽象类
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();   // 抽象方法
}

// let b = new Animal3('Jack'); // [error:] 不允许被实例化

class Cat3 extends Animal3 {
    public eat() {
        console.log(`${this.name} is eating.`);
    }

    public sayHi() { // 必须实现继承的抽象方法
        console.log(`Meow, My name is ${this.name}`);
    }
}
let cat3 = new Cat3('Tom');


// 给类加上 TypeScript 的类型
class Animal4 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
        return `My name is ${this.name}`;
    }
}

let d: Animal4 = new Animal4('Jack');
console.log(d.sayHi()); // My name is Jack
