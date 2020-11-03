#!/bin/bash
#read name   # read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量

echo "hello"

your_name='toto'
echo $your_name   # toto
echo your_name    # your_name

for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"   # 拼串需要加花括号
done

readonly myUrl='https://xxx'  #只读
#myUrl='https://zzz'

#unset myUrl  # 无法删除只读变量
unset your_name  # 删除变量
echo $your_name  # 无输出

echo ${#myUrl}  # 11 输出字符长度
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo

#echo `expr index "$string" io`  # 输出 4

echo "$name It is a test"

# 数组
array_name=(
value0
value1
value2
value3
)
array_name[1]=wahaha~
echo ${array_name[1]}   #输出指定元素
echo ${array_name[@]}   #输出数组所有
echo ${#array_name[@]}   #输出数组个数
echo ${#array_name[*]}   #输出数组个数
echo ${#array_name[1]}   #输出数组单个元素长度

# 脚本传递参数
echo "Shell 传递参数实例！";
echo "执行的文件名：$0"; # 执行的文件名
echo "第一个参数为：$1"; # 第一个参数
echo "第二个参数为：$2";
echo "第三个参数为：$3";
echo $# # 参数数量
echo $* # 所有参数
echo $@ # 所有参数
echo $$ # 当前进程ID号
echo $! # 最后一个进程的ID号

a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"

val=`expr $a - $b`
echo "a - b : $val"

val=`expr $a \* $b`    # 乘法的*前要加反斜线
echo "a * b : $val"

val=`expr $b / $a`
echo "b / a : $val"

val=`expr $b % $a`
echo "b % a : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi

# 关系运算符：-eq -ne -gt -lt -ge -le
if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi

# 布尔运算符：! -o -a

str=abcdf
if [ -z $str ]
then
  echo "${str}长度为0"
else
  echo "${str}长度不为0"
fi

file="/var/www/runoob/test.sh"
if [ -r $file ]
then
   echo "文件可读"
else
   echo "文件不可读"
fi
if [ -w $file ]
then
   echo "文件可写"
else
   echo "文件不可写"
fi
if [ -x $file ]
then
   echo "文件可执行"
else
   echo "文件不可执行"
fi
if [ -f $file ]
then
   echo "文件为普通文件"
else
   echo "文件为特殊文件"
fi
if [ -d $file ]
then
   echo "文件是个目录"
else
   echo "文件不是个目录"
fi
if [ -s $file ]
then
   echo "文件不为空"
else
   echo "文件为空"
fi
if [ -e $file ]
then
   echo "文件存在"
else
   echo "文件不存在"
fi


echo -e "Hello, Shell\n"  # Hello, Shell 换行
printf "Hello, Shell\n"   # Hello, Shell

printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876

printf %s abc def
printf %s abcdef
printf "%s and %d \n"  # and 0
printf "%s %s %s\n" a b c d e f g h i j

for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

for str in 'This is a string'
do
    echo $str  # This is a string
done

int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done

:<<EOF
echo '按下 <CTRL-D> 退出'
echo -n '输入你最喜欢的网站名: '
while read FILM
do
    echo "是的！$FILM 是一个好网站"
done
EOF

let x=5*2+3
echo $x

export NOTE_TEST_ENV=test1

echo $NOTE_TEST_ENV
