/** 类型断言 - （Type Assertion）可以用来手动指定一个值的类型。
 *  语法：
 *  1. <类型>值
 *  或
 *  2. 值 as 类型。在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
 * **/

// 在还不确定类型的时候就访问其中一个类型的属性或方法
// function getLength(something: string | number): number {
//     if (something.length) { // 报错：不是共有的属性或方法
//         return something.length;    // 报错：不是共有的属性或方法
//     } else {
//         return something.toString().length;
//     }
// }

// 使用类型断言，将 something 断言成 string
function getLength(something: string | number): number {
    // if ((<boolean>something).length) {    // 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的(any除外)：
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}