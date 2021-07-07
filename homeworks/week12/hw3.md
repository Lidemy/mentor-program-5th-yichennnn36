## 請簡單解釋什麼是 Single Page Application
Single Page Application（SPA）單頁應用程式，顧名思義就是僅有一個頁面的應用程式，網頁不需跳轉就可以達到基本的新增、讀取、修改、刪除資料功能。

傳統的 Web Site 採取多頁式做法（Multi-page），以 Client Request — Server Response 的溝通方式，來產生網頁的畫面，會造成比較不好的使用者體驗，因資料更新或是點選按鈕時都必須重新載入整個頁面。
現在的 Web Site 開始轉移到 SPA 的觀念，採單頁式（Single-page）的做法，透過動態重寫當前頁面來與使用者互動，而非傳統的從伺服器重新載入整個新頁面。

## SPA 的優缺點為何
#### 優點：
  * 使用者體驗較佳：透過動態重寫當前頁面，改善了過去必須因為一個小地方的更新，而使得整個網頁必須重新載入的困擾，也讓使用者更輕易地感受到與桌面應用程式一樣的使用感。
  * 前後端的職責區分：前後端分離的設計模式，後端負責輸出資料，而前端負責抓資料與頁面的呈現。
  * 速度和響應能力：把 UI 從 Server-side 移到 Client-side，以降低 Server 的負載量，提升頁面反應。

#### 缺點：
  * 不利於搜尋引擎優化（SEO）：由於資料是 JavaScript 動態添加的，只有在使用者互動後才載入內容。因此在未載入內容前，SPA 對於網路爬蟲來說，就只是個框架空殼，沒有實際對使用者有用的內容。
  * 需要額外實現瀏覽器的前進後退功能：使用者無法透過點選按鈕返回到應用程式的先前狀態，因為SPA不能儲存使用者在頁面不同狀態之間的跳轉。（可透過 HTML5 History API 來解決）
  * 如果使用者在瀏覽器中禁用 JavaScript，會沒辦法看到內容，而使頁面看起來是空白頁。

當應用程式資料替換較多，需要即時反應速度快時可以使用 SPA，例如：
社群網站、聊天室、股市交易等...
而需要安全性較高，SEO 為必需的情況下可使用 MPA，例如：
部落格、電商平台等...

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
Client-side Render（CSR） 和 Server-side Render（SSR）最主要的差別，在於有了資料後要在前端渲染還是在後端渲染。

由 php 直接輸出內容的留言板，頁面是由 Server 產生，Client 負責顯示，只要有地方更新，就必須重新載入整個頁面，除了影響使用者體驗之外，也會提升對 Server 的負擔，也就是 SSR。

本週的作業 Server 只回傳資料，藉由 ajax 讓我們可以在不需重新載入畫面的前提下，拿到 XML 或 JSON 格式的資料，由 Client 透過 JavaScript 渲染出來，也就是 CSR。


### 資料參考
[單一頁面應用程式. 總之是把工作丟給別人做| by 黃冠融| Medium](https://reurl.cc/O0mDWv)
[凡走過請留下痕跡：AJAX網頁的狀態與瀏覽記錄](http://rettamkrad.blogspot.com/2013/04/ajaxandhistoryapi.html)
[SPA和MPA網站區別，SEO優缺點剖析，甚麼時候該用那個?](https://www.leunghoyin.hk/spa-vs-mpa)
[Client-side Render 和 SSR 的差別](https://noob.tw/client-server-side-render/)
