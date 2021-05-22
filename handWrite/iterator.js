// 使一个对象实现遍历器接口

function iteratorAble(obj) {
  // if (typeof obj !== 'object' || Array.isArray(obj))
  //   return obj
  // obj[Symbol.iterator] = function *() {
  //   let keys = Object.keys(obj)
  //   console.log(keys)
  //   for(let i = 0; keys.length; i++) {
  //     yield obj[keys[i]]
  //   }
  // }
  obj[Symbol.iterator] = function() {
    let index = -1;
    let _this = this;
    return {
      next() {
        let len = _this.length;
        //console.log(len);
        index++;
        //console.log(index);
        return index < len ? {
          value: _this[index],
          done: false
        } : {
          value: _this[index],
          done: true
        };
      }
    };
  }
}

function iteratorUtil() {
  let index = -1;
  let _this = this;
  return {
    next() {
      let len = _this.length;
      //console.log(len);
      index++;
      //console.log(index);
      return index < len ? {
        value: _this[index],
        done: false
      } : {
        value: _this[index],
        done: true
      };
    }
  };
}
// Array.prototype[Symbol.iterator] = iteratorUtil;
var arr = [1, 2, 3, 4];
// console.log(arr);
// for (const item of arr) {
//   console.log(item);
// }

// iteratorAble(arr)
// for (let k of arr) {
//   console.log(k)
// }

let obj = {
  a: 1,
  b: 2,
  c: 3
}
iteratorAble(obj)
obj[Symbol.iterator]()
for (let k of obj) {
  console.log(k)
}
