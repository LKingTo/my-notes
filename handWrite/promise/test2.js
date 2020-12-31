console.log('1');

var p1

setTimeout(function () {
  console.log('2');
  p1 = new Promise(function (resolve) {
    console.log('4');
    resolve();
  })

  setTimeout(function () {
    console.log('9');
    new Promise(function (resolve) {
      console.log('11');
      resolve();

    }).then(function () {
      console.log('12')
    })

    p1.then(function() {
      console.log('13')
    })
  })

  p1.then(function () {
    console.log('5')
  })
})

new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8')
})
