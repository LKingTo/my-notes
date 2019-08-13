// 赋值的时候，变量的形状必须和接口的形状保持一致。
var tom = {
    name: 'Tom',
    age: 25
};
var tom1 = {
    name: 'Tom'
};
var tom2 = {
    name: 'Tom',
    gender: 4
};
var tom3 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
// tom.id = 9527;  // 只读，不可赋值 
