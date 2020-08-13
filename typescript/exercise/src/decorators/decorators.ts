/***
 * Decorators装饰器：
 * 在原有代码外层包装了一层处理逻辑
 *
 * 为什么要用装饰器？
    可能有些时候，我们会对传入参数的类型判断、对返回值的排序、过滤，对函数添加节流、防抖或其他的功能性代码，
    基于多个类的继承，各种各样的与函数逻辑本身无关的、重复性的代码。
    所以，对于装饰器，可以简单地理解为是【非侵入式的行为修改】。
 *
 * 若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项:
 * 命令行：
 * tsc --target ES5 --experimentalDecorators
 * 或
 * tsconfig.json:
 * {
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
   }
 */
// 函数装饰器，扩展属性和方法
function fun(target: any) {
  target.prototype.url = '动态扩展的属性',
  target.prototype.run = () => {
    console.log('这是一个run方法')
  }
}

@fun
class Hello {
  constructor(){}
  getData(){}
}

let hello:any = new Hello();
console.log(hello.url);
hello.run()


// 装饰器工厂
let fun1 = (msg: string) => {
  return (target: any) => {  // 这是一个装饰器
    target.prototype.url = msg;
  }
}

@fun1('我是装饰器工厂')
class Stu {
  constructor(){}
  getData(){}
}

let stu:any = new Stu();
console.log(stu.url)


// 属性装饰器
function decProperty (param: any) {
  return (target: any, attr: any) => {
    target[attr] = param
  }
}

class Study {
  @decProperty('http://study.163.com')
  public url:any;
  constructor(){}
  getUrl(){
    console.log(this.url)
  }
}

let study:any = new Study();
study.getUrl();
