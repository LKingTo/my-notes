#!/bin/bash

#set -u  # 遇到报错则停止向下执行

#echo $a # 变量未定义，报错

#set -x  # 执行输出命令前，打印该命令：+ echo xxx

set -e   # 命令执行错误（返回值非0），则终止执行
#set +e   # 关闭 set -e 命令
set -o pipefail   # 一个子命令失败，整个管道命令就失败，弥补set -e失效问题

#foo      # 有运行失败的命令，bash默认会继续向下执行

foo | echo a  # 管道命令运算符（|），以最后一个命令返回值作为整体返回值。使set -e失效

echo bar
