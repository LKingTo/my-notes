# 自定义一个简单的cli

## 常用到的几个库

这个解释网上很多，避免啰嗦重复，我这里做简单的梳理，具体详细的使用可以搜下网上

### commander
这是用来编写指令和处理命令行的，具体用法如下：

```
const program = require("commander");
// 定义指令
program
  .version('0.0.1')
  .command('init', 'Generate a new project from a template')
  .action(() => {
    // 回调函数
  })
// 解析命令行参数
program.parse(process.argv);
```
回忆一下，我们曾用过的 vue init 的命令就是这样声明的。

### inquirer
这是个输入交互库，就是你在创建项目的时候，输入项目名，项目描述等等

### chalk
这是用来修改控制台输出内容样式的，比如颜色啊

### ora
这是一个好看的加载，就是你下载的时候会有个转圈圈的那种效果

### download-git-repo
看名字很明显了，这是用来下载远程模板的，支持 GitHub、 GitLab 和 Bitbucket 等

-[文献摘要](https://zhuanlan.zhihu.com/p/141415763)
