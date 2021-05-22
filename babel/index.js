/**
 * @babel/parser 编译器插件，其作用就是将源码转换为AST，基于ESTree规范
 * @babel/generator 将转换好的ast重新生成代码
 *
 */

var {parse} = require('@babel/parser')
var {default: generate} = require('@babel/generator')

var code = `const name = "jyy"`   // 原始代码
var ast = parse(code)   // 源代码生成ast
var targetCode = generate(ast)    // 将ast转成目标代码

// console.log(targetCode)  // { code: 'const name = "jyy";', map: null, rawMappings: undefined }

// console.log(ast)

// AST结构里code的词法单元的位置
// console.log(ast.program.body[0])
// 输出：{type: 'VariableDeclaration', ... declarations: [Node], kind: 'const'}

console.log(ast.program.body[0].declarations)
/**
 * 输出：{
 *  type: 'VariableDeclarator',
 *  ...
 *  id: Node { type: 'Identifier', name: 'name'},
 *  init: Node { type: 'StringLiteral', value: 'jyy'}
 *  ...
 *  }
  */

