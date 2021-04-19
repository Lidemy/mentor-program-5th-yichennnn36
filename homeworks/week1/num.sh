#!/bin/bash

if [ -z $1 ];
then
    echo "請輸入參數"
else
    for (( i=1; i<=$1; i=i+1 ))
    do
    touch "${i}.js";
    done
    echo "檔案建立完成"
fi
