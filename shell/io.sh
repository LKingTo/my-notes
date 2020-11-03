#!/bin/bash

#输出输入重定向

#echo "输出重定向" > file.txt   # 覆盖文件内容
#echo "追加输出重定向" >> file.txt   # 追加内容

#wc -l < file.txt > file2.txt   # 获取行数
#wc -l < file.txt >> file2.txt
cat < file.txt >> file2.txt     # 获取内容

