"use strict";
// infer关键字：* 用于推断待推断的类型
Object.defineProperty(exports, "__esModule", { value: true });
// 用法1：
var promise_1 = require("./promise");
var ids = 1; // 必须为number
var names = '1'; // 必须为string
var arr = promise_1.Promise.reject([1]);
var arr1 = [1];
function fn(a) {
    return a;
}
var Fn = /** @class */ (function () {
    function Fn() {
    }
    return Fn;
}());
var inst = new Fn();
var arr2 = [1, 2];
// arr2.push(2)
