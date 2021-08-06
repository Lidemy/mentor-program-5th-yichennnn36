## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
加密：
  * 加密為一對一關係，是可逆的，可以透過金鑰解密來還原。
  * 加密方式分為：「對稱式加密(Symmetric Encryption)」＆「非對稱式加密(Asymmetric Encryption)」。
    * 對稱式加密：傳送方與接收方的加解密皆使用同一把密鑰，傳送方傳資料時，使用這把鑰匙加密，而接收方收到訊息後，再用同一把鑰匙解密，就能解開訊息了。缺點是如果鑰匙在傳送時被攔截，加密的訊息就能被輕易破解，所以需要更進階的非對稱式加密來解決此 Bug。
    * 非對稱式加密：每個使用者都擁有一對金鑰：公開金鑰(Public key)及私密金鑰(Private key)；當訊息由其中一把金鑰加密後，就必須用另一把金鑰解密，加解密的鑰匙要是完整一對的。運作原理是傳送方與接收方先把彼此的公鑰傳給對方，當傳送方要傳送時，就用接收方的公鑰將訊息加密，接收方收到加密訊息後，再用自己的密鑰解開，這樣即使有心人拿到公鑰，只要沒拿到接收方的私鑰，也還是無法解密訊息。實際上的操作還會加上數位簽章來確認訊息真的是由傳送方傳送的，更多資料可參考此[文章](https://reurl.cc/Q9ayOO)。
雜湊：
  * 雜湊是不可逆的，無法解回原本的輸入。
  * 相同的內容使用相同雜湊演算法，雜湊值一樣。
  * 不同的內容使用相同雜湊演算法，有可能會得到同一個結果（多對一關係，即為「碰撞 collision」），但機率極低
  * 無論原文的內容長短，透過同一個雜湊演算法運算完的輸出都會是固定的長度 ，即輸出的長度不受原文影響。

如果密碼以明文的方式存在於資料庫，當有駭客入侵了主幾，那所有使用者的資料將會直接外洩，所以需要將密碼透過特殊處理存入。
藉由雜湊的特性，將經過演算法後的密碼存入資料庫，即使知道了雜湊值，也很難去從輸出反推做解碼，這也是為什麼當使用者忘記密碼時，系統會叫你重設密碼，而不是直接寄給你密碼；而使用者如果要登入時，只要輸入對的密碼做雜湊，去核對是否為資料庫的雜湊值即可登入。

也因為相同輸入會得到相同的輸出，有心人士可利用這點把各種輸入輸出記錄下來，成為一張對應表（被稱為 rainbow table），資料夠多的情況下，理論上是有可能經由暴力破解得到密碼，所以我們可以透過「加鹽 salt」（對原始資料額外加入字串），加鹽後才做雜湊，提高安全性。

## `include`、`require`、`include_once`、`require_once` 的差別
四個函式皆為引用外部檔案的函式。

`include()` 和 `require()` 最大的差別是在，當引入檔的程式有問題時，若使用 `require()` 會直接停止程式執行；而使用 `include()` 會先產生警告訊息並忽略錯誤而繼續執行後續的程式。

`include_once()`和`require_once()`，與上述差別在於，如函式命名"_once"，檔案只會引入一次，可以防止重複引入檔案時，造成重複讀取而使得自訂函式或變數重複定義的情況。

## 請說明 SQL Injection 的攻擊原理以及防範方法

### SQL Injection：
因為 SQL 是字串拼接，攻擊者能夠注入（Inject）一些東西，執行他想要的結果。

假設有一個留言版，新增留言的程式碼如果這樣寫：
`INSERT INTO yichen_comments(nickname, content) VALUES('%s', '%s')`

使用者如果在輸入框輸入 ` '), ('hacker', 'inject ` ，惡意輸入讓 sql 變成以下字串，可以假裝成別人來新增留言。
`INSERT INTO yichen_comments(nickname, content) VALUES('aaa', ''), ('hacker', 'inject')`

或是在輸入框輸入 ` '), ('hacker', (SELECT password FROM users WHERE id=40))# `，就可以成功撈到 id=40 的密碼。
有了以上的案例，也可以利用一樣的方法去撈資料庫的資料。

### 防範方法：prepared statements
是一種用於資料庫查詢時的技術，使用時會在SQL指令中需要填寫數值的地方用參數代替。

```php
$conn = new mysqli($server_name, $username, $password, $db_name); #連線資料庫

$stmt = $conn->prepare("INSERT INTO comments(nickname, content) VALUES(?, ?)");
#prepare("SQL 語法", 參數 ?)

$stmt->bind_param('ss',$nickname, $content); 
#bind_param() 帶入參數值 's'->string / 'i'->integer / 'd'->double / 'b'->blob
#若參數有兩個string則為'ss'以此類推

$result = $stmt->execute(); #執行
$result = $stmt->get_result(); #拿到結果
```

##  請說明 XSS 的攻擊原理以及防範方法

### XSS（Cross-Site Scripting）
在別人的網頁上執行 JavaScript 的程式碼
EX：`<h1>test</h1>`、`<script>window.location("http://...")</script>` 

只要能執行 JavaScript，就可以做任何事：
1. 竄改頁面
2. 竄改連結
3. 偷 Cookie 等...

### 防範方法：escape，跳脫
`htmlspecialchars($str, ENT_QUOTES, 'utf-8')`
替換需要進行 HTML 編碼的字元（< 、 > 、 & 、 " 、 '），可以的話將全部輸出資料庫內容的地方都跳脫會比較好。

## 請說明 CSRF 的攻擊原理以及防範方法
### CSRF（Cross Site Request Forgery）跨站請求偽造
在不同的 domain 底下偽造出「使用者本人發出的 request」。藉由瀏覽器的機制來製造攻擊機會，欺騙瀏覽器，讓瀏覽器以為某些行為是使用者本人的操作行為，只要發送 request 給某個網站，就會把關聯的 cookie 一起帶上去。

假設某網站有一段程式碼如下：
```html
<img src='https://small-min.blog.com/delete?id=3' width='0' height='0' />
<a href='/test'>開始測驗</a>
```
開啟頁面的同時，在不知不覺的情況下發送刪除的 request。

### 防範方法：
常見的防禦方法：
* 檢查 request header referer
  此欄位代表是從哪個地方來的，不合法的 domain 會直接 reject，但缺點是某些瀏覽器可能不會帶 referer 或是使用者關閉自動帶 referer 的功能，所以解法並不完善。

* 加上圖形驗證碼、簡訊驗證等等
  多加一層防護，在付款或轉戰的情況下很實用，但如果只是要單純刪掉文章而使用，可能造成使用者體驗不佳，

* 加上 CSRF Token
  < 產生＆儲存 token 都是 Server >
  舉例來說，我們在表單中加入一個 hidden 的欄位，叫做 `csrftoken`，值由 Server 隨機產生，並存在 server 的 session 中，當表單送出時，server 會比對 `csrftoken` 與自己存的是否一樣，是的話代表確實是由本人發出的 request，而攻擊者並不知道 `csrftoken` 的值是什麼，所以無法進行攻擊。

* Double Submit Cookie
  < 產生由 Server、儲存由 Client >
  與上述類似，由 server 產生一組隨機的 token 並加在 form 上，但不同的點在於 server 不需要儲存東西（不需要把值寫在 session），同時讓 client side 設定叫 csrftoken 的 cookie，值也是同一組 token： `Set-Cookie: csrftoken=xxxxxxxxx`，藉由此區分出這個 request 是不是從同樣的 domain 來的，但攻擊者如果掌握了你底下任何一個子網域，就可以幫你來寫 cookie，並且順利攻擊了。

* Client 端生成的 Double Submit Cookie
  < 產生＆儲存 token 都是 Client >
  SPA(單頁應用程式，網頁不需跳轉就可以達到基本的 CRUD 功能) 在拿取 `csrftoken` 會有困難，所以可以改成 Client 端生成，此 cookie 只是要確保攻擊者無法取得、沒有包含任何敏感資訊，所以不避擔心安全性考量。

* 瀏覽器端的防禦：SameSite cookie
  針對 Cookie 的一種安全機制，以下取自 MDN
  ```
  The SameSite attribute of the Set-Cookie HTTP response header allows you to declare if your cookie should be restricted to a first-party or same-site context
  ```
  可以利用 `Set-Cookie: session_id=ewfewjf23o1; SameSite` 來啟用，分為兩種模式：Strict（預設） 、Lax

## 資料參考
* [[資訊安全] 密碼存明碼，怎麼不直接去裸奔算了？淺談 Hash , 用雜湊保護密碼](https://reurl.cc/W3NYp5)
* [身為 Web 工程師，你一定要知道的幾個 Web 資訊安全議題](https://reurl.cc/0jdbVM)
* [[2018 iThome 鐵人賽] Day 6: 加密和雜湊有什麼不一樣？](https://ithelp.ithome.com.tw/articles/10193762)
* [[Security] 雜湊不是加密，雜湊不是加密，雜湊不是加密。小朱® 的技術隨手寫](https://dotblogs.com.tw/regionbbs/2017/09/21/hashing_is_not_encryption)
* [[第十二週] 資訊安全 - 常見攻擊：CSRF
CSRF 原理 - Yakim shu](https://yakimhsu.com/project/project_w12_Info_Security-CSRF.html)
* [讓我們來談談 CSRF](https://blog.huli.tw/2017/03/12/csrf-introduction/)

