/** 联合类型 - 取值可以为多种类型中的一种 **/
let myFavoriteNum: string | number;
myFavoriteNum = 'seven';
myFavoriteNum = 7;
// myFavoriteNum = true;    //[error]

// 只能访问此联合类型的所有类型里共有的属性或方法
// function getLength(something: string | number): number {
//     return something.length;
// }

let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
// console.log(myFavoriteNumber.length); // 编译时报错