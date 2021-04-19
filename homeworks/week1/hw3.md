## 教你朋友 CLI

所謂的 CLI（Command Line Interface），指的就是操控電腦的介面，像是電影中駭客對著鍵盤批哩啪拉輸入的螢幕畫面，就是利用**純文字**的方式來跟電腦對話下指令，跟一般使用電腦時，藉由滑鼠或觸控面板拖曳、刪除、點擊檔案等等的方式不一樣。

大概瞭解了 Command LIne 之後呢，我們就可以來操作！

### Step 1：先看看你是使用 Windows 系統還是 Mac 系統？

* Windows 系統：可以使用 [git-bash](https://git-scm.com/download/win) 進行安裝
* Mac 系統：可以用內建的終端機（Terminal）或是安裝 [iTerm2](https://iterm2.com/)

### Step 2：打開程式，輸入指令！

**先教學一些基本以及你需要用到的指令**

1. 印出現在的位置：pwd（print working directory）

```
[22:14:30] liuyichen ➜ ~» pwd                                                                
/Users/liuyichen
```

2. 列出所有檔案：ls（list）

```
[22:17:30] liuyichen ➜ ~» ls                                                                 
Applications Documents    Library      Music        Profiles     Report       fonts    
Desktop      Downloads    Movies       Pictures     Public       Terminal   
```

3. 切換位置：cd（change directory）

```
[22:17:31] liuyichen ➜ ~» cd desktop                                                         
[22:19:58] liuyichen ➜ ~/desktop»                                                       

```

4. 新增資料夾：mkdir（make directory）

```
[22:19:58] liuyichen ➜ ~/desktop» mkdir folder                                              
[22:23:24] liuyichen ➜ ~/desktop» ls                                                         
folder                          
```

5. 新增檔案：touch

```
[22:23:27] liuyichen ➜ ~/desktop» touch aaa.txt                                              
[22:25:08] liuyichen ➜ ~/desktop» ls
aaa.txt  folder   
```


### 任務：

今天你想要新增一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案，可以這樣做

```
[22:27:33] liuyichen ➜ mkdir wifi         //新增 wifi 資料夾                      
[22:28:40] liuyichen ➜ ls                 //印出檢查
wifi
[22:28:51] liuyichen ➜ cd wifi            //進入 wifi 資料夾內
[22:28:57] liuyichen ➜ touch afu.js  //新增 afu.js                    
[22:29:05] liuyichen ➜ ls            //印出檢查是否成功
afu.js

```

這樣就完成了！
