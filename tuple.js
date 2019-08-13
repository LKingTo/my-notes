/** Tuple元组 - 合并了不同类型的对象的数组 **/
var xcatliu;
// 1. 可以只赋值其中一项
xcatliu[0] = 'Xcat Liu';
// xcatliu[1] = 25;
// xcatliu[0].slice(1);
// xcatliu[1].toFixed(2);
// 2. 当直接对元组类型的变量进行初始化或者赋值，需要提供所有元组类型中指定的项
xcatliu = ['Xcat Liu', 25]; //正常
// let xcatliu1: [string, number] = ['Xcat Liu'];  // 报错，赋值不完全
// let xcatliu1: [string, number];
// xcatliu1 = ['Xcat Liu'];    // 报错，赋值不完全
// xcatliu1[1] = 25;
// 3.越界的元素，当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
var xcatliu3;
xcatliu3 = ['cat', 28];
xcatliu3.push('dog');
xcatliu3.push(50);
// xcatliu3.push(true);    // 报错，限制为string或number类型
