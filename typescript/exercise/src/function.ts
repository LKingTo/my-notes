/** 函数的类型 **/
let myFun: (x:number, y: number) => number;
myFun = (x, y) => {return x + y;};
let aa = myFun(2,3);

// 声明式
function sum(x: number, y: number): number { //输出规定number类型
    return x + y;
}

sum(1, 2);  // 输入参数数量要一致

// 表达式
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

// 用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 可选参数
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat1 = buildName('Tom', 'Cat');
let tom1 = buildName('Tom');


// 参数默认值 - 添加了默认值的参数识别为可选参数
function buildName1(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat2 = buildName1('Tom', 'Cat');
let tom2 = buildName1('Tom');


// 剩余参数 - ...rest
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);


// 重载 - 允许一个函数接受不同数量或类型的参数时，作出不同的处理
// TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
reverse('hello');
