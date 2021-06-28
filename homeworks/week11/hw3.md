## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
加密：
  * 加密為一對一關係，是可逆的，可以透過解密來還原。
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
替換需要進行 HTML 編碼的字元（< 、 > 、 & 、 " 、 '），再把資料
## 請說明 CSRF 的攻擊原理以及防範方法



## 資料參考
* [[資訊安全] 密碼存明碼，怎麼不直接去裸奔算了？淺談 Hash , 用雜湊保護密碼](https://reurl.cc/W3NYp5)
* [身為 Web 工程師，你一定要知道的幾個 Web 資訊安全議題](https://reurl.cc/0jdbVM)
* [[2018 iThome 鐵人賽] Day 6: 加密和雜湊有什麼不一樣？](https://ithelp.ithome.com.tw/articles/10193762)
* [[Security] 雜湊不是加密，雜湊不是加密，雜湊不是加密。小朱® 的技術隨手寫](https://dotblogs.com.tw/regionbbs/2017/09/21/hashing_is_not_encryption)

