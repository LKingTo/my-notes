/** 枚举 - 用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。**/
// 枚举使用 enum 关键字来定义：
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
function d(day) { }
// 手动赋值
// 1. 未手动赋值的枚举项会接着上一个枚举项递增，递增步长为1
// 2. 未手动赋值的枚举项与手动赋值的重复，会覆盖
// 3. 使用类型断言来让 tsc 无视类型检查，必须为最后项
var Days1;
(function (Days1) {
    Days1[Days1["Sun"] = 7] = "Sun";
    Days1[Days1["Mon"] = 1] = "Mon";
    Days1[Days1["Tue"] = 2] = "Tue";
    Days1[Days1["Wed"] = 3] = "Wed";
    Days1[Days1["Thu"] = 4] = "Thu";
    Days1[Days1["Fri"] = 5] = "Fri";
    Days1[Days1["Sat"] = 6] = "Sat";
})(Days1 || (Days1 = {}));
;
var Days2;
(function (Days2) {
    Days2[Days2["Sun"] = 3] = "Sun";
    Days2[Days2["Mon"] = 1] = "Mon";
    Days2[Days2["Tue"] = 2] = "Tue";
    Days2[Days2["Wed"] = 3] = "Wed";
    Days2[Days2["Thu"] = 4] = "Thu";
    Days2[Days2["Fri"] = 5] = "Fri";
    Days2[Days2["Sat"] = 6] = "Sat";
})(Days2 || (Days2 = {}));
;
console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
var Days3;
(function (Days3) {
    Days3[Days3["Sun"] = 7] = "Sun";
    Days3[Days3["Mon"] = 8] = "Mon";
    Days3[Days3["Tue"] = 9] = "Tue";
    Days3[Days3["Wed"] = 10] = "Wed";
    Days3[Days3["Thu"] = 11] = "Thu";
    Days3[Days3["Fri"] = 12] = "Fri";
    Days3[Days3["Sat"] = 'S'] = "Sat";
})(Days3 || (Days3 = {}));
;
// 常数项和计算所得项
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = "blue".length] = "Blue";
})(Color || (Color = {}));
;
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
var directions1 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
