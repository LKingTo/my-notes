#继承的方式：
##原型链：让新实例的原型等于父类的实例
    * 子类型.prototype = new 一个原型对象
    * 特点：
        * 实例可继承的属性有：
            * 实例构造函数的属性  // Son() { this.xx }
            * 父类构造函数的属性  // Parent() { this.xx }
            * 父类原型的属性  // Parent.prototpye.xxx
    * 缺点：
        * 包含引用类型值的原型，该值会被所有实例共享
        * 创建子类型时，不能向超类型(父类型)的构造函数传递参数

##借用构造函数（经典继承）
    * Fatcher.call(this, …args) 、apply 
    * 思路：子类型构造函数内部，调用超类型构造函数  // 相当于拷贝一份
    * 特点：
        * 解决了原型链继承的缺点
        * 可继承多个构造函数的属性
    * 缺点：
        * 只能继承父类构造函数的属性
        * 继承的方法都在构造函数中定义，每次创建实例都要创建一遍方法，无法复用
        * 超类型中定义的方法，对子类型为不可见  // Father.prototype.xxx 无法访问

##组合继承（结合原型链+借用构造函数）
    * 思路：
        * 原型链实现对原型属性、方法的继承   // .prototype = new XX
        * 构造函数实现对实例属性的继承  // call(this, …args)
    * 优点：
        * 融合了原型链、构造函数
        * instanceof、isPrototypeOf正常
    * 缺点：调用了两次父类构造函数

##原型式继承
    * 思路：
        * 设置一个object函数  // object(o) {}
        * object函数内先创建一临时的构造函数  // F() {}
        * object函数内接受一传入对象，作为构造函数的原型  // F.prototype = o
        * 返回该临时类型的一个新实例  // return new F()
    * 通过Object.create(obj, options)创建新对象
        * obj - 作为新对象原型的对象
        * options - 为新对象定义额外属性的对象
    * 缺点：包含引用类型值的属性会被共享

##寄生式继承
    * 思路：
        * 在原型式继承的基础上增加一些函数或属性
            * function CreateObj(o) {
            * var newob = Object.create(o)
            * newob.xxx = xxxx
            * return newob }
    * 缺点：
        * 包含引用类型值的属性会被共享
        * 跟借用构造函数一样，每次创建对象都会创建一遍方法

##寄生组合式继承
    * 思路：
        * 借用构造函数方式，调用超类属性  // Parent.call(this, args)
        * 使用寄生式继承来继承超类型的原型  // var p = Object.create(Parent.prototype)
        * 然后再将结果指定给予类型的原型  // p.constructor = Child; Child.prototype = p
    * 优点：
        * 解决属性共享问题
        * 只调用一次Parent构造函数
