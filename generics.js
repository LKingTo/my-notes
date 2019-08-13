/** 泛型 - 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
 *
 *
 ***/
/** 定义value、输出数组的每一项都系T类型 **/
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']，<string>手动指定具体类型
createArray(3, 'x'); // ['x', 'x', 'x']，类型推论自动推算类型
/** 多个类型参数 **/
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
//约束了泛型T必须符合接口Lengthwise的形状，即具有length属性
function loggingIdentity(arg) {
    console.log(arg.length); //参数必须具有length属性
    return arg;
}
// loggingIdentity(7); // [error]
//多个类型参数之间也可以互相约束：
// 要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
function copyFields(target, source) {
    for (var id in source) {
        target[id] = source[id];
    }
    return target;
}
var x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
var createArray1; // 定义泛型的类型
createArray1 = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
createArray1(3, 'x'); // ['x', 'x', 'x']
/** 泛型类 **/
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
/** 泛型参数的默认类型 **/
function createArray2(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray2(3, 'x'); //
