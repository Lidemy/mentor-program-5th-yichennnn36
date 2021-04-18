## 請解釋後端與前端的差異。

前端是指我們看得到的部分，像是顯示的畫面、圖片排版，跟使用者互動的功能，而後端是負責處理資料的儲存、與資料庫溝通等等......。

舉個下一題的例子來解釋網頁的前後端：我們從 Google 首頁看到標題、按鈕，搜尋框，這些是前端的範疇，而打完搜尋的內容按下 enter ，將內容傳到資料庫後，從資料庫儲存的資訊中找到我們需要的答案，這些使用者看不到的部分則是後端。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 瀏覽器送出關鍵字給 Google 的 Server
2. 從 DNS Server 找到 Google 的位址（172.217.160.78）
3. 瀏覽器發送 request 給 172.217.160.78
4. Google 的 Server 從資料庫查詢關鍵字，抓取結果並回傳
4. Google 瀏覽器呈現所看到的網頁內容

**重新理解一次加上 DNS cache 之 update**

假設使用 google DNS，了解 cache

1. 瀏覽器送出關鍵字，再把它傳到 google.com
2. 瀏覽器檢查 DNS cache 有沒有 google.com
3. 有的話將 request 回傳 172.217.160.78（google IP 位址）
4. 沒有的話，程式碼會呼叫作業系統去檢查 DNS cache 有沒有 google.com
5. 有的話直接回傳 172.217.160.78（google IP 位址）
6. 沒有的話會去 DNS server 找 google.com 在哪，找到後回傳 172.217.160.78（google IP 位址）
7. 瀏覽器發送 request 給 172.217.160.78（google IP 位址）
8. Google 的 Server 從資料庫查詢關鍵字，抓取結果並回傳 response
9. Google 瀏覽器解析原始碼，將 layout 渲染在我們的螢幕畫面

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1. 印出檔案前十行＆後十行的內容：`head <file>`、`tail <file>`
2. 取得網站 IP 位址：`dig <domain> +short`
3. 連線至遠端 IP 位址，連線成功後即可登入主機並進行遠端操控： `ssh user@host`
