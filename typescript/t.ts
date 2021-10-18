// 实现一个ts的工具函数GetOnlyFnProps<T>，提取泛型类型 T 中字段类型是函数的工具函数，其中 T 属于一个对象

type GetOnlyFnKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T] //

type GetOnlyFnProps<T extends object> = {
  [K in GetOnlyFnKeys<T>]: T[K]
}

// 测试用例
// 除了函数类型，其他都删除
type obj = {
  a: () => string,
  b: number
}
type ccc = GetOnlyFnProps<obj>
let value: ccc = {
  a: () => '1',
}
/**
T[K] extends Function ? K : never 是指如果 T[K] 是 Function 的话，那类型就是 K，否则就是 never
{
[K in keyof T]: T[K] extends Function ? K : never
} 相当于排除掉了值类型不是 function 的，并且现在新的值是 K

再用 [keyof T] 取一下，拿到的就是 K 了
*/


// 实现一个ts的工具函数UnGenericPromise<T>，提取Promise中的泛型类型
type UnGenericPromise<T> = T extends Promise<infer R> ? R : T

const resStatus: UnGenericPromise<Promise<number>> = 404

type OA = 'TOTO' | 'JACKY' | 'JILL'
type MS = Record<OA, {age: number}>
const ms: MS = {
  TOTO: {age: 20},
  JACKY: {age: 20},
  JILL: {age: 20},
}

type T1 = {
  a: number,
  o: [],
  c: null
}
type T2 = {
  b: number,
  o: []
}
type T12 = Exclude<T1, T2>
type T121 = Extract<T1, T2>
type T3 = NonNullable<T1>
