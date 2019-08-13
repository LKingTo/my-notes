/** 类与接口 - 接口【用途二】对类的部分行为进行抽象
 *  implements - 实现，把一个类的特性提取成接口（interfaces）
 ***/

// 接口对类的行为进行抽象
interface Alarm {
    alert();
}

interface Light {
    lightOn();
    lightOff();
}

// Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯。
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}

// 接口继承接口
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}

// 接口继承类
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};


// 混合类型
interface SearchFunc {  //定义一个函数类型的接口形状
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

// 定义一个函数类型的接口，有自己的属性和方法
interface Counter {
    (start: number): string;   // 一个限定输入输出类型的方法
    interval: number;   // 限定类型的属性
    reset(): void;  // 限定输入输出为空的方法
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;