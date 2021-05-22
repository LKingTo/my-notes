var babel = require("@babel/core");
var code = "<div class='c'>jyy</div>";  // 代码
babel.transform(code, {plugins: ["@babel/plugin-transform-react-jsx"],}, function (err, result) {
  console.log(result.code);
  // React.createElement("div", {
  //   class: "c"
  // }, "jyy");
});

var code = `num => {
   return num ** 2;
}`;  // 代码
babel.transform(code, {plugins: ["@babel/plugin-transform-arrow-functions", "@babel/plugin-transform-exponentiation-operator"]}, function (err, result) {
  console.log(result.code);
  // (function (num) {
  //     return Math.pow(num, 2);
  // });
});
