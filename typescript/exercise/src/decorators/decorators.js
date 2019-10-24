var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/***
 * Decorators装饰器：
 * 在原有代码外层包装了一层处理逻辑
 *
 * 为什么要用装饰器？
    可能有些时候，我们会对传入参数的类型判断、对返回值的排序、过滤，对函数添加节流、防抖或其他的功能性代码，
    基于多个类的继承，各种各样的与函数逻辑本身无关的、重复性的代码。
    所以，对于装饰器，可以简单地理解为是非侵入式的行为修改。
 */
// 函数装饰器，扩展属性和方法
function fun(target) {
    target.prototype.url = '动态扩展的属性',
        target.prototype.run = function () {
            console.log('这是一个run方法');
        };
}
var Hello = /** @class */ (function () {
    function Hello() {
    }
    Hello.prototype.getData = function () { };
    Hello = __decorate([
        fun
    ], Hello);
    return Hello;
}());
var hello = new Hello();
console.log(hello.url);
hello.run();
// 装饰器工厂
var fun1 = function (msg) {
    return function (target) {
        target.prototype.url = msg;
    };
};
var Stu = /** @class */ (function () {
    function Stu() {
    }
    Stu.prototype.getData = function () { };
    Stu = __decorate([
        fun1('我是装饰器工厂')
    ], Stu);
    return Stu;
}());
var stu = new Stu();
console.log(stu.url);
// 属性装饰器
function decProperty(param) {
    return function (target, attr) {
        target[attr] = param;
    };
}
var Study = /** @class */ (function () {
    function Study() {
    }
    Study.prototype.getUrl = function () {
        console.log(this.url);
    };
    __decorate([
        decProperty('http://study.163.com')
    ], Study.prototype, "url", void 0);
    return Study;
}());
var study = new Study();
study.getUrl();
