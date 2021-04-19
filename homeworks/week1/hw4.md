## 跟你朋友介紹 Git

### 什麼是 Git？

Git 就是用來做版本控制的工具。
它可以幫你保存更新過的歷史紀錄，同時也可以顯示編輯的內容，以及避免多人協作時，你的檔案被覆蓋掉的風險等等......，如果幫「蔡哥的笑話」加入版本控制，每經過一次修改，電腦就會幫你儲存這些編輯紀錄，這樣版本就算很多，也可以清楚的管理舊與新的檔案。

大概瞭解了 Git 之後呢，我們來進行安裝及指令教學！

### 先看看你是使用 Windows 系統還是 Mac 系統？

* Windows 系統：安裝 [git-bash](https://git-scm.com/download/win) ，再從官網下載 [GIT ](https://git-scm.com/download/win) ，裝完後可以在 git-bash 試著輸入：`git --version`，看看是否安裝成功。
* Mac 系統：可以用內建的終端機（Terminal）或是安裝 [iTerm2](https://iterm2.com/)，打開程式輸入：`git --version`，按下 enter，或是直接下載 [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 安裝檔。

### 打開程式，輸入指令！

**先教學一些基本以及你需要用到的指令**

1. 把專案初始化加入 git：`git init`

```
[9:41:39] liuyichen ➜ ~/tsaisjoke» git init                         
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:     git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:     git branch -m <name>
Initialized empty Git repository in /Users/liuyichen/tsaisjoke/.git/
[9:41:47] liuyichen ➜ ~/tsaisjoke(master)»
```

2. 查看版本狀態：`git status`

```
[9:43:38] liuyichen ➜ ~/tsaisjoke(master✗)» git status             
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
    joke.txt

nothing added to commit but untracked files present (use "git add" to track)
```

3. 會發現上一步驟有一行 **Untracked files** ，此時可以把檔案加入版本控制：`git add joke.txt`

3. 修改完後建立新的版本：`git commit -m "版本描述"`

```
[9:46:21] liuyichen ➜ ~/tsaisjoke(master✗)» git commit -m "joke_v1"  
[master (root-commit) 85d2bbe] joke_v1
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 joke.txt
```

5. 查看編輯的歷史紀錄，就可以清楚知道各個版本：`git log`

```
commit 85d2bbefea8b39de2022e87499ec78a22b181717 (HEAD -> master)
Author: yichen <xni830306@gmail.com>
Date:   Sat Apr 17 09:47:41 2021 +0800

    joke_v1
(END)
```

6. 如果想回到某一個版本：`git checkout <版本名稱>`

版本名稱可以從 `git log` 中找到， commit 後面的亂碼即為版本名稱。

***

### 任務：讓我們來把「蔡哥的笑話」加入版本控制吧！

#### Step 1：在 Terminal 找到「蔡哥的笑話」存放的資料夾並移動位置過去，並初始化加入 git：

```
[10:00:30] liuyichen ➜ ~» ls                                  
Applications Downloads    Music        Public       fonts        改為
Desktop      Library      Pictures     Report       tmp
Documents    Movies       Profiles     Terminal     tsaisjoke
[10:00:34] liuyichen ➜ ~» cd tsaisjoke
[9:41:39] liuyichen ➜ ~/tsaisjoke» git init
[9:41:47] liuyichen ➜ ~/tsaisjoke(master)»
```

**如果不清楚 CLI 指令可以參考[教你朋友使用 CLI](https://hackmd.io/@DMZ2uezmQsSNVTB_03UCEQ/SJ59NpPIO)**

#### Step 2：修改或新增了笑話後，將檔案加入版本控制：

```
[10:05:00] liuyichen ➜ ~/tsaisjoke(master✗)» git add jock.txt joke_v2.txt
```

#### Step 3：加入版本控制後，建立新的版本：

```
[10:05:23] liuyichen ➜ ~/tsaisjoke(master✗)» git commit -m "joke_v2" 
[master fba2dba] joke_v2
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 joke_v2.txt
```

這樣大致上就完成了，如果有想要查看狀態、修改紀錄，或是切換版本，可以參考剛剛上面有提到的 `git status`、`git log`、`git checkout`，去使用呦！

### 如何存取專案？

#### 如果蔡哥你今天有想要把你的笑話集給分享出去那可以怎麼做呢？

Git 數據庫又分為遠端數據庫與本地數據庫。

遠端數據庫：有一個專用 server，多人可共享資源的數據庫。
本地數據庫：個人使用，通常為自己電腦的數據庫。

如果今天你要把專案存入遠端數據庫你可以使用 `git push`，相反地，如果想要把專案拉到本地數據庫則用`git pull`。

**本地數據庫存入遠端數據庫： `git push <遠端數據庫簡稱> <專案名稱>`**
**遠端數據庫拉至本地數據庫： `git pull <遠端數據庫簡稱> <專案名稱>`**

這樣應該夠清楚了！如果有問題都可以在問我。
