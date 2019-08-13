/** 对象的类型——接口
 *  接口的【用途一】：对对象的形状进行描述
 ***/
// 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
interface Person {
    name: string;
    age: number;
}

// 赋值的时候，变量的形状必须和接口的形状保持一致。
let tom: Person = {
    name: 'Tom',
    age: 25
};

// 可选属性
interface Person1 {
    name: string;
    age?: number;   //可选
}

let tom1: Person1 = {
    name: 'Tom'
};

// 任意属性
interface Person2 {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom2: Person2 = {
    name: 'Tom',
    gender: 4
};

// 只读属性
interface Person3 {
    readonly id: number;  //设置只读属性
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom3: Person3 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

// tom.id = 9527;  // 只读，不可赋值