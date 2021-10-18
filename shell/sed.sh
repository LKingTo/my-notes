#!/bin/bash

# cat读取文件内容，grep正则匹配，sed -n 查找1到3行
#cat user.txt | grep h | sed -n '1,3p'

# 删除命令 d或delete
#cat user.txt | grep h | sed '$d'  #删除最后一行
#cat user.txt | grep h | sed '2,3d'

#cat user.txt | grep h | sed 's/^/添加的头部&/g'  # 在所有行首添加
#cat user.txt | grep h | sed 's/$/&添加的尾部/g'   # 在所有行末添加
#cat user.txt | grep h | sed '2s/M/替换字符串/g'   # 替换第2行
#cat user.txt | grep h | sed '$s/M/替换字符串/g'   # 替换最后一行
#cat user.txt | grep h | sed '2,$s/M/替换字符串/g'   # 替换2到最后一行
#cat user.txt | grep h | sed 's/^/添加的头部&/g; s/$/&添加的尾部/g'   # 同时执行两个替换规则，用分号隔开

#sed '/cheng/p' user.txt
#sed -n '/cheng/p' user.txt

workingBranch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
echo $workingBranch

