#!/bin/bash

#使用 . 号来引用test1.sh 文件
. ./fun.sh

# 或者使用以下包含文件代码
# source ./fun.sh

funWithReturn
echo "引用fun.sh文件的funWithReturn函数，返回值：$?"
