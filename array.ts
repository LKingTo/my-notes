/** 数组的类型 **/
//「类型 + 方括号」表示法
// let fibonacci: number[] = [1, 1, 2, 3, 5];   // 限定数组的项为数值
// let fibonacci: number[] = [1, '1', 2, 3, 5];    // 存在非数值，报错
// let fibonacci: (number | string)[] = [1, '1', 2, 3, 5];    // 数组的项为联合类型

// 数组泛型
// let fibonacci: Array<number> = [1, 1, 2, 3, 5];

// 用接口表示数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

// any 在数组中的应用
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
