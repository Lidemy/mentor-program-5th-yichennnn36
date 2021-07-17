## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
### Domain Name System(DNS)，域名系統
在網路世界中，每個裝置都有一個 IP 位址，用以此互相通訊，IP 位址由一串數字組成，分為兩大類：IPv4 由十進位數字組成，並以點分隔，如：172.16.254.1；IPv6 由十六進位數字組成，以冒號分割，如：2001:db8:0:1234:0:567:8:1。由此可知，識別上會有一定的難度，而 DNS 將 IP 位址與域名(Domain name)關聯在一起，能夠讓人們更方便地存取網路。

舉例來說，Google 的域名是 `google.com`，其中一個網站伺服器的 IP 位址是 `172.217.160.78`。我們在瀏覽器的網址列輸入 `google.com` 後，實際上是透過 `172.217.160.78` 連線到 Google 首頁的。

#### 運作原理
DNS 是由許多不同層級的名稱伺服器組成，每個層級保存的資訊不一樣，是以一層一層的模式接續處理。以 `www.aaashop.com` 為例，解析域名的過程由右至左，`.com` 會先被解析，再來是 `.aaashop`，依此類推。
解析流程：
1. DNS Resolver Server：其功能是負責整個查詢的過程，將轉送至 Root Name Server。
2. Root Name server：找到負責 `.com` 域名的 TLD Name Server。並將 TLD Name Server 的 IP 位址，回傳給 DNS Resolver。
3. DNS Resolver -> TLD Name Server：找到負責該 Domain 的 Domain Name Server。並將 Domain Name Server 的 IP 位址，回傳給 DNS Resolver。
4. DNS Resolver -> Domain Name Server：在域名服務供應商的托管區域中找到 `www.aaashop.com` 的紀錄，並回傳關聯的 IP 位址給 DNS Resolver Server。
5. 瀏覽器透過 DNS Resolver Server 回傳的 IP 位址成功連線，此外，為了增加查詢效率，會實作 cache 機制來保存先前查詢過的域名及 IP 位址一段時間。 

### Google Public DNS
Google Public DNS 是 Google 面對大眾推出的一個公共免費域名解析服務。

根據[官方文件](https://developers.google.com/speed/public-dns)寫到，使用 Google 公開的 DNS 可以
- Speed up your browsing experience
- Improve your security
- Get the results you expect with absolutely no redirection
對於一般大眾來說，不外乎就是可加快網路瀏覽，改善安全性，以及更為可靠；但對於 Google 來說，越多的使用便能得到越多的使用者數據，並可利用這些數據達到精準投放廣告、了解和分析使用者行為...等。


## 什麼是資料庫的 lock？為什麼我們需要 lock？
以搶票網頁來說：
A：剩餘 10 張，購買 10 張
B：剩餘 10 張，購買 2 張
如果今天 A 和 B 同時購買成功，就會發生超賣的問題。如果要避免此方式我們需要先完成 A 的購買動作後，才可執行 B 的購買動作，讓結果與實際的資料是符合的。

### lock
當有多項請求訪問同一個資料庫時，有可能導致資料的不一致，因此，需要一種機制來將資料庫的訪問順序化，確保不同的使用者無法同時更新資料列中的相同資料，從而保證資料庫資料的一致性，此機制即為 lock。不過由於需要等待執行，有可能會造成效能上的損耗。


## NoSQL 跟 SQL 的差別在哪裡？
在說明差異之前先說一下什麼是關聯式資料庫（Relational database）
### 關聯式資料庫
- 資料是以一個或是多個資料表 (table) 的方式存放：
  使用關聯式資料庫的網站，會有多個 table，用來記錄不同的資料，資料表結構清楚，會有設計好的欄位及型態。例如一家餐廳可能會有菜單、顧客、顧客意見等資料表做紀錄，而菜單資料表中可能有 menu_id、品項、價格...等欄位，每個欄位分別是 string 還是 integer ...等型態。
- 資料之間有明確的關聯：
  為了儲存結構化的資料，資料之間大多會有清楚的關聯。
  以上述的例子來說，我們會在顧客意見表中去關聯 `menu_id` ，即可利用 `menu_id` 回到菜單的資料表中去查詢餐點。
- 關聯式資料庫以 SQL 語言來操作

### SQL
SQL（Structured Query Language 結構化查詢語言）是一種專門用來管理與查詢關聯式資料庫的程式語言。透過 SQL，我們能在關聯式資料庫裡新增、查詢、更新和刪除資料，同時也能建立和修改資料庫模式。

### NoSQL
NoSQL 指的是 `Not Only SQL`，也就是不限定為「關聯式資料庫」的資料庫管理系統統稱。
- 不需要固定且預先設計好的 schema，而是改用 key-Value 的資料模式來解決龐大資料的異動困難。
- 不使用關聯模型，也就是資料間沒有關聯性，所以可以任意切割或調整，甚至可以分散到不同伺服器中建立副本。
- 由於沒有結構所以也無法支援 SQL 語法來查詢資料。存取資料的方式，必須使用資料庫系統提供的 API 才能夠新增、修改、刪除資料，或是使用資料庫系統提供的指令，遠端連線執行後才能存取資料，也因為如此，不同的 NoSQL 資料庫之間並沒有標準語言，缺乏標準化，因而存在很大的差異性。
- 不講求資料同步，只有保證最後資料會達到一致。

對於社群網站或是其他平台來說，需要處理的資料量是過去一般網站的非常多倍，為了處理龐大的使用者資料，需求從「能夠無錯誤地同步處理結構清楚的資料」轉變為「處理高速且大量產生的資料，但不需要即時同步，也不需絕對地零錯誤」，因此各大平台開始開發各類的 NoSQL 資料庫來呼應此需求。

關聯式資料庫系統還是最多開發者使用的資料庫管理系統，但我認為在使用上沒有誰好誰壞，端看使用的需求是什麼。


## 資料庫的 ACID 是什麼？
一個好的關聯式資料庫系統必須要確定他在每個 transaction 的過程中，都是正確而且可靠的。

* A-tomicity（原子性，又稱不可分割性）：一個 transaction 裡的所有動作要不全部成功，要不全都失敗。
* C-onsistency（一致性）：在同一時間點，資料庫的內容必須要一致，不管事資料之間的結構、關係、或是資料內容，在每個時間點不管從何讀取都應該要是一致的。
* I-solation（獨立性）：transaction 必須獨立且不受影響，確保不同的使用者無法同時更新資料列中的相同資料。
* D-urability（持續性）：完成 transaction 後的結果必須要永久保存，不能隨便被更動，即使系統失效重啟。

### 參考資料
[域名系統（DNS）101—網址的小旅行](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%B5%B1-dns-101-7c9fc6a1b8e6)
[Google Public DNS 維基百科](https://zh.wikipedia.org/wiki/Google_Public_DNS)
[繼續深入資料庫 瞭解一下資料庫的鎖機制](https://www.itread01.com/content/1546098852.html)
[SQL/NoSQL是什麼？認識資料庫管理系統DBMS](https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction)
[Day 1 — 30天與資料庫共舞](https://ithelp.ithome.com.tw/articles/10233356)
