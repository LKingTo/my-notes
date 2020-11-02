/***
 * 错误提示及其解决方案
 */

// TS2339: Property 'xxx' does not exist on type 'XXX'.
/**
 * 例如Vue3.0获取组件实例： const {ctx} = getCurrentInstance()
 * 报错：TS2339: Property 'ctx' does not exist on type 'ComponentInternalInstance | null'.
 * 解决：使用类型断言，const {ctx} = (getCurrentInstance as any)
 */
