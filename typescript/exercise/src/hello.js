function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
// let user = [0, 1, 2];   //Argument of type 'number[]' is not assignable to parameter of type 'string'.
console.log(sayHello(user));
