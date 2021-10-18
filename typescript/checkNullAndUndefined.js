// 检查TypeScript中的null和undefined
var a;
var b = null;
function check(x, name) {
    if (x == null) {
        console.log(name + ' == null');
    }
    if (x === null) {
        console.log(name + ' === null');
    }
    if (typeof x === 'undefined') {
        console.log(name + ' is undefined');
    }
}
check(a, 'a');
check(b, 'b');
// a == null
// a is undefined
// b == null
// b === null
