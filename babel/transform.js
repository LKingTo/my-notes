var t = require('@babel/types');
var {parse} = require('@babel/parser');
var {default: traverse} = require('@babel/traverse');
var {default: generate} = require('@babel/generator');

var orginCode = `findEleById("jyy")`;   // 原始代码
// 生成原始AST
var originAST = parse(orginCode, {
  sourceType: "module"
});

// 对AST进行遍历并操作
traverse(originAST, {
  Identifier(path) {
    var {node} = path;
    // 找到findEleById，将其替换成为目标节点
    if (node && node.name === "findEleById") {
      var newNode = t.memberExpression(t.identifier("document"), t.identifier("getElementById")); // 创建目标节点
      path.replaceWith(newNode);  // 替换原始节点
      path.stop();
    }
  }
});

const targetCode = generate(originAST, { /* options */ }, orginCode);   // 将转换后的AST生成目标代码
console.log(targetCode);    // { code: 'document.getElementById("jyy");',map: null,rawMappings: undefined }
