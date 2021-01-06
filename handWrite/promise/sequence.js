// 实现一个按顺序加载的promise

const ps = [
  new Promise(resolve => {setTimeout(() => {resolve(1)}, 1000)}),
  new Promise(resolve => {setTimeout(() => {resolve(2)}, 3000)}),
  new Promise(resolve => {setTimeout(() => {resolve(3)}, 2000)}),
  new Promise(resolve => {setTimeout(() => {resolve(4)}, 1500)})
]

// 方式一：递归
const run1 = (p) => {
  p.then(res => {
    console.log(res)
    const nextP = ps[ps.findIndex(f => f === p) + 1]
    if (nextP) {
      run1(nextP)
    }
  })
}
// run1(ps[0])

// 方式二：await/async
const run2 = async () => {
  for (let p of ps) {
    let ret = await p
    console.log(ret)
  }
}
run2()


