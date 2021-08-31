// infer关键字：* 用于推断待推断的类型

// 用法1：
import { Promise } from "./promise";

type Ids = number[]
type Names = string[]
type Unpacked<T> = T extends (infer R)[] ? R : T  // R为被推断为数组的子项类型，若T是数组类型，则返回R（数组子项的类型）
type idTypes = Unpacked<Ids>  // T为数组类型，所以idTypes返回number类型
type nameTypes = Unpacked<Names>  // T为数组类型，所以idTypes返回string类型

const ids: idTypes = 1   // 必须为number
const names: nameTypes = '1'   // 必须为string

// 用法2：获取一个Promise<xxx>类型中的xxx类型
type TResponse = Promise<number[]>  // 返回值类型为number[]的Promise类型
type Unpacked1<T> = T extends Promise<infer R> ? R : T  // 若T为Promise类型，返回Promise返回值的类型
type resType = Unpacked1<TResponse>

const arr: TResponse = Promise.reject([1])
const arr1: resType = [1]

// 用法3：推断联合类型
type Foo<T> = T extends {a: infer U, b: infer U} ? U : never
type T10 = Foo<{a: string, b: number}>   // 类型为 string|number
type T11 = Foo<{a: string, b: string}>   // 类型为 string
type T12 = Foo<{c: string, d: number}>   // 类型为 never
type T13 = Foo<{a: string, b: never}>    // 类型为 string


function fn<T> (a: T): T {
  return a
}
interface IFn {
  name: string
}
class Fn implements IFn {
  name: 'fn'
}
type returnT = ReturnType<typeof fn>  // 类型为 T
type returnT1 = ReturnType<never>     // 类型为 never
type instanceT = InstanceType<typeof Fn>  // 类型为 Fn类的实例
const inst: instanceT = new Fn()

type T03 = NonNullable<string | null | undefined>   // 类型为string
type roArr = ReadonlyArray<number>
const arr2: roArr = [1,2]
// arr2.push(2)


