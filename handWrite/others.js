// 求数组里最大连续项的和？（求数组中【连续的子数组】使其【和最大】）
function getMaxSum(arr) {
  let dp = new Array(arr.length).fill(0);

  dp[0] = arr[0];
  // [1,0,0,0,0,0]
  let maxSum = 0

  for (let i = 1; i < arr.length; i++) {

    // 前一个与当前相加，求前一个与相加值的较大者。即dp[i]缓存当前累加可能达到的最大值
    dp[i] = Math.max(arr[i], dp[i - 1] + arr[i]);

    if (dp[i] > maxSum) {
      maxSum = dp[i];
    }
    // dp[1]=max(-2,(1-2))=-1 maxSum=0  [1,-1,0,0,0,0]
    // dp[2]=max(3, (-1+3))=3  maxSum=3 [1,-1,3,]
    // dp[3]=max(4, (3+4))=7   maxSum=7 [1,-1,3,7,]
    // dp[4]=max(-1,(7-1))=6    maxSum=7  [1,-1,3,7,6]
    // dp[5]=max(5, (6+5))=11  maxSum=11  [1,-1,3,7,6,11]
  }

  return maxSum;
}

console.log(getMaxSum([1, -2, 3, 4, -1, 5]));   // 11
