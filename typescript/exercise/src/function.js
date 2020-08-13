/** 函数的类型 **/
var myFun;
myFun = function (x, y) { return x + y; };
var aa = myFun(2, 3);
// 声明式
function sum(x, y) {
    return x + y;
}
sum(1, 2); // 输入参数数量要一致
// 表达式
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
var mySum = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 可选参数
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomcat1 = buildName('Tom', 'Cat');
var tom1 = buildName('Tom');
// 参数默认值 - 添加了默认值的参数识别为可选参数
function buildName1(firstName, lastName) {
    if (lastName === void 0) { lastName = 'Cat'; }
    return firstName + ' ' + lastName;
}
var tomcat2 = buildName1('Tom', 'Cat');
var tom2 = buildName1('Tom');
// 剩余参数 - ...rest
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
var a = [];
push(a, 1, 2, 3);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
reverse('hello');
