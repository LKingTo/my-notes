const ESBuild = require('esbuild')

// 利用 esbuild 编译代码
ESBuild.buildSync({
  entryPoints: ['in.ts'],
  outfile: './dist/apiOut1.js',
  minify: true, // 压缩代码体积
})

ESBuild.buildSync({
  entryPoints: ['index.css'],
  outfile: './dist/apiOut.css',
  minify: true, // 压缩代码体积
})

ESBuild.buildSync({
  entryPoints: ['app.jsx'],
  bundle: true,
  loader: { '.js': 'jsx' }, // 默认使用 js loader ,手动改为 jsx-loader
  outfile: './dist/apiOut2.js',
  minify: true,
})

// 利用 esbuild 处理 jsx 代码
ESBuild.transformSync('<div/>', {
  jsxFactory: 'h', //默认为 React.CreateElement,可自定义, 如果你想使用 Vue 的 jsx 写法, 将该值换成为 Vue.CreateElement
  loader: 'jsx', // 将 loader 设置为 jsx 可以编译 jsx 代码
})

// 同上，默认为 React.Fragment , 可换成对应的 Vue.Fragment。
ESBuild.transformSync('<>x</>', {
  jsxFragment: 'Fragment',
  loader: 'jsx',
})
