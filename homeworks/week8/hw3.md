## 什麼是 Ajax？
#### Asynchronous JavaScript And XML
使用非同步的方式與伺服器交換資料的 JavaScript，送出 request 後不需等待結果，待 response 回傳後就會被融合進當下頁面或應用中，不僅可以讓使用者在不刷新畫面的情況下繼續操作，也不會有操作途中「中斷」與「等候」的時間，創造更佳的使用者體驗。近年由於 JSON 等格式的流行，使用 Ajax 處理的資料並不限於 XML。

## 用 Ajax 與我們用表單送出資料的差別在哪？
使用表單送出資料會刷新頁面，但用 ajax 的話可以向 Server 發出非同步請求，索取局部內容的資料進行抽換，大幅降低每次請求與回應的資料量，從而提高網頁效率。
透過表單送出資料，在伺服器回傳 response 時，瀏覽器會直接 render 出結果；而藉由 ajax，在伺服器回傳 response 時，瀏覽器會把結果轉傳給 JavaScript。

## JSONP 是什麼？
可以先從**同源政策講起（Same Origin Policy）**，瀏覽器因為安全性的考量，如果我們要串的 API 網站與我們所在的網站「不同源」時（簡單來說，可想成不同 Domain），瀏覽器會把 Response 給擋下來，不讓你的 JavaScript 拿到並且傳回錯誤。

#### JSON with padding
跨來源請求的一種方法，利用 ｀<script src=""></script>｀ 不受同源政策影響這點來拿資料，
範例：
```
<script> // 宣告 function 拿到資料
  function setData(users) {
    console.log(users);
  }
</script>
<script src="http://123.com/user.js"></script> //  假設有一個 user.js 的檔案並在裡面夾帶需要的資料，ex：執行的 function：setData([..夾帶的內容..])
```
JSONP 的缺點就是你要帶的參數永遠都只能透過附加在網址上的方式（GET）帶過去，沒辦法用 POST。現今也比較少用了。

## 要如何存取跨網域的 API？
#### CORS （Cross-Origin Resource Sharing）
跨來源資源共享，這也是跨來源請求的規範，Server 必須在 response 的 Header 加上 `Access-Control-Allow-Origin`，當瀏覽器收到 response 後，會檢查 `Access-Control-Allow-Origin` 的內容，如果有包含發起 request 的 origin，即允許進行跨來源存取。
example:
```
Access-Control-Allow-Origin: *                   // 同意啦，哪次不同意
Access-Control-Allow-Origin: http://example.com  // 只允許 http://example.com
```

CORS 又分為**簡單請求**與**預檢請求**：
```
簡單請求：
1. Request method：GET、HEAD、POST 其一
2. Request header 的 Content-Type 為其中一種：
  * application/x-www-form-urlencoded
  * multipart/form-data
  * text/plain

> 更多詳細的規則：[Simple requests - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
```
預檢請求：不符合簡單請求的規則。發送預檢請求時瀏覽器會先以 OPTIONS method 去確認後續的請求能否送出，因為假設沒有預檢機制，今天對一個網頁發出 DELETE 的 request 給 API，瀏覽器的 CORS 機制，儘管沒有 Response，但是 Server 端的確收到了這個 Request，因此就會把這筆資料給刪除；如果有 Preflight Request 的話，在發送出去收到結果的時候，就會知道這個 API 並沒有提供 CORS，因此真的 DELETE 請求就不會送出，到這邊就結束了。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週是透過 node.js 發送 request，而本週是由瀏覽器發 request，就會有上述的同源政策問題。


本週作業資料參考：
* [輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)
* [Cross-Origin Resource Sharing (CORS)](https://ithelp.ithome.com.tw/articles/10251693)
