// 最长递增子序列

/**
 * 返回最长递增子序列的长度
 * @param arr
 * @returns {number}
 */
function lis(arr) {
  let len = arr.length,
    dp = new Array(len).fill(1); // 用于保存长度
  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i]
    for (let j = i + 1; j < len; j++) {
      let next = arr[j]      // 如果是递增 取更大的长度值
      if (cur < next)
        dp[i] = Math.max(dp[j] + 1, dp[i])
    }
  }
  return Math.max(...dp)
}

console.log('lis', lis([10, 9, 2, 4, 3, 8, 7, 13])) // 4
console.log('lis', lis1([10, 9, 2, 4, 3, 8, 7, 13]))   // [2,3,5,7] => [2,4,8,13]


function lis1(arr) {
  let len = arr.length,
    res = [],
    dp = new Array(len).fill(1);  // 记录每个索引作为起始索引的递增长度，初始都为1：[1,1,...]
  for (let i = 0; i < len; i++) {
    res.push([i])   // 记录各个（索引）递增序列：[[0],[1],[2],...]
  }
  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i],       // [13] [7]...
      nextIndex = undefined; // 如果为-1 直接跳过，因为-1代表的是新节点，不需要进行排序
    if (cur === -1) continue
    for (let j = i + 1; j < len; j++) {
      let next = arr[j]      // 满足递增条件
      if (cur < next) {
        let max = dp[j] + 1  // 当前长度是否比原本的长度要大
        if (max > dp[i]) {
          dp[i] = max
          nextIndex = j
        }
      }
    }
    // 记录满足条件的值，对应在数组中的index
    if (nextIndex !== undefined)
      res[i].push(...res[nextIndex])
  }
  console.log('res', res, dp)
  let index = dp.reduce((prev, cur, i, arr) => cur > arr[prev] ? i : prev, dp.length - 1)  // 返回最长的递增子序列的index
  return res[index]
}
