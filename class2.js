/** 类与接口 - 接口【用途二】对类的部分行为进行抽象
 *  implements - 实现，把一个类的特性提取成接口（interfaces）
 ***/
// Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯。
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('Car alert');
    };
    Car.prototype.lightOn = function () {
        console.log('Car light on');
    };
    Car.prototype.lightOff = function () {
        console.log('Car light off');
    };
    return Car;
}());
// 接口继承类
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
