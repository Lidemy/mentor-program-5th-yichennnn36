# 初步部署
把課程、作業簡介看完後，一開始覺得蠻茫然的，又不知道該從何下手，先看了一些同學的每日進度後，大概有一點頭緒可以從哪些方向開始，e.g. 買主機、連線、設置環境...，還有可能會遇到的一些問題...等，有了一點概念後我就先把這週需要做的事情整理一下：

```
有一個可以執行 php 的地方 -> 買主機、買網域 -> 建置開發環境、建資料庫 -> 把之前的作業放上去 -> 部署完成
```

運行動態網頁是一開始想法的起始點，買主機、網域...這些是從課程內容中抓出來的，再從中去做關聯、列出需要的工具，最後結果，就像之前交作業一樣丟到遠端的 Server 讓網頁跑起來。我一開始開發環境是先想到 XAMPP 這套軟體是怎麼運作的，結合網頁伺服器、資料庫、程式語言、操作資料庫的工具，往下繼續查資料就找到 LAMP、LEMP、WAMP...等執行環境。


## AWS EC2
大概有頭緒後，就先從申請虛擬主機空間下手，選擇 AWS 是因為這是唯一聽過的 XD，一打開後發現提供的服務也太多（嚇到），看到關鍵字 `Virtual servers in the cloud`，就選擇了 Amazon EC2(Elastic Compute Cloud) ，[官方文件](https://aws.amazon.com/getting-started/hands-on/remotely-run-commands-ec2-instance-systems-manager/?nc1=h_ls)裡也有步驟操作可以參考。
< 我有先按照文件寫的建立 IAM 角色，但我查了一下好像也非必要？！>

### 建立
* 註冊
* Create an EC2 instance
* 選擇作業系統 - Ubuntu
  > 看文件寫 `Select the Amazon Linux AMI.`，但裡面又有 macOS、Red Hat、Ubuntu、Microsoft，這些反而還是我看過的，所以又去查了一下，看到學長姐的部署筆記和同學都是使用 ubuntu，所以我就選了這個。
* 選擇 Instance Type -> 設定 Security Group -> 設定 private key
  這部分我也都參考網站文件、資料一直 next 到設定 Security Group ＆ 金鑰後就完成了。
  > 設定 Security Group：設定允許透過哪些 port 可以傳入資料，和透過哪些 port 可以傳出資料。
  > - SSH (22 port)
  > - HTTP、HTTPS (接收 http request 的防火牆 80/443 port)
  > - MySQL (連線資料庫的防火牆 3306 port)>
 
* 測試連線，照指令執行
  ```
  $ chmod 400 <私鑰檔案路徑>
  $ ssh -i "<私鑰檔案路徑>" ubuntu@ec2-<IPv4 地址>.<選擇的區域>.compute.amazonaws.com
  ```
* 更新 Ubuntu

## LAMP
設置環境使用 LAMP：Linux(作業系統) + Apache（伺服器）+ MySQL(資料庫) + PHP(程式語言)。

看到很多都是使用 Tasksel 套件就去查了一下：
> Tasksel 主要的目的在於將套件分門別類，依任務的屬性分類便利使用者快速安裝，免除套件過多安裝手續繁雜困難

### 安裝
* 安裝 Tasksel 套件 -> 安裝 lamp-server

* 瀏覽器輸入伺服器的 IPv4 IP 位址，會看到 Apache2 Ubuntu Degault Page
  > 這邊一開始自己犯蠢，試了兩次都失敗，後來檢查才發現是我忘記連線
  
* 安裝 phpMyAdmin(操控資料庫的工具，以介面來管理 MySQL 資料庫)
  > 看了部署筆記後發現都要再去修改 MySQL 的登入設定，一開始不解為什麼，查了一下才發現因為 MySQL 預設使用 auth_socket 的驗證 plugin，使用者可以透過 sudo 直接登入 root 帳號，不需要輸入密碼，但因為我們要使用 phpMyAdmin，而這套工具預設需要密碼登入，才要去修改。


## 設定域名
跟助教拿到折扣碼後就成功購買了自己的網域（整個過程好像購物網站XD），也是照著[文件](https://docs.gandi.net/zh-hant/)去操作，註冊好域名後：
* `A Record` 改成 AWS 主機的 IP 地址

  > * A Record：最常見的設定方式把網址與 IP 做雙向綁定，可指向一個或多個 IP 地址。
  > * CNAME Record：指向一個名稱而不是 IP 地址。
  > * TXT Record：為一些說明文字﹐可以用來說明主機/網路環境設定。
  > * MX Record：郵件伺服器﹐負責經由DNS查詢進行郵件傳遞的郵件伺服器。

一開始不是很了解 CNAME Record 是什麼，所以整理了資料：
* A Record 指向 IP 位址做關聯：
* CNAME Record 關聯名稱與名稱：
```
NAME                  TYPE     VALUE
-------------------------------------------
www.yichennnn.tw    - CNAME -  yichennnn.tw
yichennnn.tw          - A -    111.22.33.444
```
請求訪問 `www.yichennnn.tw` 的 client 會得到 `yichennnn.tw` 返回的結果。

## 部署程式到 Server
### 找到路徑
循著文章資料找到預設 apache 首頁所在目錄 `var/www/html`，但要修改權限如下：
```
drwxr-xr-x  2 root root 4096 Jul 13 14:35 html
  ⬇ $ sudo chown ubuntu /var/www/html
drwxr-xr-x  2 ubuntu root 4096 Jul 13 14:35 html
```
> $ chown 改變擁有者：`root->ubuntu`
> $ chomd 改變權限，決定誰可以做什麼（會改到三個為一組的九個權限，e.g. `rwxr-xr-x`）

### 上傳專案
我使用了兩種做法實作 ->
* git clone 上傳 GitHub repository
* FileZilla：
  想說好像跟交作業的方式差不多，改一改 apiUrl、conn.php 後上傳，迫不及待打開瀏覽器看，直接就給我失敗qq，於是又是一連串 debug：
  * 資料庫跳出錯誤訊息：
    ```
    Warning in ./libraries/plugin_interface.lib.php#551
    count(): Parameter must be an array or an object that implements Countable
    ```
    > 原因是 `count()` 在沒有添加參數的情況下會噴錯誤，參考學姊 [HeidiLiu 筆記](https://hackmd.io/@Heidi-Liu/note-website-deployment) 做處理。


  * 留言板畫面成功渲染，但抓不到留言：
    > 看了錯誤訊息是回傳 500，覺得很奇怪，想了一下既然有成功跑出畫面，程式碼 api 檢查後又沒錯，打開 phpMyAdmin，才發現是 table 拼錯...

  * 新增留言失敗：
    > POST 失敗，顯示資料庫寫入失敗，開 devtool 看確定是有抓到留言沒錯，但寫入失敗？！推測一下不是程式碼就是 INSERT INTO query 有錯，就把 sql 丟到 phpMyAdmin 去跑後錯誤就跑出來了
    ```
    #1364 - Field 'id' doesn't have a default value
    ```
    > 當下想說該不會 AUTO_INCREMENT 忘記勾起來，還真的是這樣。

***

# 部署後續與總結
考慮到其實蠻多參考資料都附上很詳細的部署步驟及 CLI 指令，所以 hw2 內容主要都放在我實作的過程以及我遇到什麼問題，接著怎麼解決。

### 後續發現問題
* 原來 IP 是會變的 ＠＠！：
重啟 EC2 instance 後發現 IP 改變了，參考[文件](https://enterprise.arcgis.com/en/server/latest/cloud/amazon/allocate-elastic-ip-and-associate-with-your-instance.htm)上的說明，可以利用 `Elastic IP` 解決。
  * 什麼是 [Elastic IP addresses](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)？
      > 可以透過網域的 DNS 紀錄中指定彈性 IP 位址，或是將 instance 與 彈性 IP 位址建立關聯，但不是很清楚在實作上都會建立關聯嗎？還是不會設定這個？

* 防火牆安全性問題：
在同學的進度報告上看到防火牆安全性的問題，一直以為我的 security group 設定後就沒事了，查了資料感覺 aws 的 Security Group 跟 linux ufw 不太一樣，但開啟 port 的設定功能應該是重疊不衝突的？(這部分還是沒有很懂)
輸入指令 `$ sudo ufw status` 顯示 `inactive`，還是使用 `sudo ufs` 設定都把它打開。

  > 這邊又多了很多坑，e.g. VPC、CIDR，查過資料但不太懂，不知道有沒有需要先把這塊補起來？

* SSL：
這週剛好有跟助教 Jas0n 問到關於 http/https 的問題（github pages 連到 mentor-program.co 的 [Mixed Content](https://web.dev/fixing-mixed-content/) 錯誤）。
問題解決後藉由查到的資料知道 SSL 憑證是什麼，想說也可以來實作看看，就使用助教推薦的 cloudflare。

  > 看到很多文章都說盡量都使用 https，如果使用 http 的話，chrome 也會擋，SEO 也會有影響，我也有個問題，既然都鼓勵大家使用 https，那為什麼還要有 http？
  看完資料的理解應該是，如果再公開網路上使用 http 非常不安全，因為傳遞的資料都是明文，要是過程中被惡意竊取，資料便會被盜用或偷走，因此才需要使用相對安全的資料傳輸：HTTPS（是透過 HTTP 進行通訊，但通訊過程使用 SSL/TLS 進行加密）。
  因為 SSL 驗證的成本考量？如果在非公開網路上使用是否就沒有這個問題？這邊也是疑惑的點

### 總結
我覺得一開始遇到最大的問題就是開頭寫到的：根本不知道要從何開始下手，一開始連需要一個主機都不知道，這時候好像只能先統整要做的事情和釐清目的是什麼，再去下關鍵字找資料。過程也是納悶參雜痛苦，還是很感謝有學長姐的奮鬥史與筆記，不然我應該做到天荒地老，這就是所謂前人種樹，後人乘涼的概念嗎 (ﾟ´Д｀ﾟ)ﾟ

***

### 參考資料：
* [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
* [如何遠端連接虛擬主機上的 mySQL 資料庫 ？](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/33)
* [[week 14] 網站部署 - 設定 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpMyAdmin](https://hackmd.io/@Heidi-Liu/note-website-deployment)
* [Day 03 : 環境架設 part II -- MySQL & phpMyAdmin](https://ithelp.ithome.com.tw/articles/10216815)
＊ [如何遠端連接虛擬主機上的 mySQL 資料庫 ？](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/33)