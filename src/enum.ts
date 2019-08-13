/** 枚举 - 用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。**/
// 枚举使用 enum 关键字来定义：
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

function d (day: Days.Sun): void {/*...*/}


// 手动赋值
// 1. 未手动赋值的枚举项会接着上一个枚举项递增，递增步长为1
// 2. 未手动赋值的枚举项与手动赋值的重复，会覆盖
// 3. 使用类型断言来让 tsc 无视类型检查，必须为最后项
enum Days1 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};


enum Days2 {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true

enum Days3 {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any> 'S'};


// 常数项和计算所得项
enum Color {Red, Green, Blue = "blue".length};


/** 常数枚举 **/
// 常数枚举是使用 const enum 定义的枚举类型：
// 常数枚举与普通枚举的区别：它会在编译阶段被删除，并且不能包含计算成员。
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

/** 外部枚举 **/
declare enum Directions1 {
    Up,
    Down,
    Left,
    Right
}

let directions1 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];