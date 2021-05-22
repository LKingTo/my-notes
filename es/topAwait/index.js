// 顶级await：可以在 async 函数外使用 await 关键字
import m from './m.mjs'
import axios from 'axios'

let result
let status = false
try {
  result = await axios('http://robotdev.gf.com.cn:32003/api/robot/investment/2.0.0/strategy/allocation/list?status=normal&channel=gfit%2Cgfit2&othersKey=others.userDefine.firstPage&othersValue=y')
  console.log('[result]', result.data, new Date().getTime())
} catch (e) {
  console.log(e)
}
status = true
console.log('[status]', status, new Date().getTime())
console.log('[m]', m)

