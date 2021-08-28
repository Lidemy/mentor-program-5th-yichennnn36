## 十六到二十週心得
這週複習週的安排基本上是一邊複習一邊學 React，原先 16 週學過的 prototype 原型鏈、閉包、this...等，這週再回頭去複習時，對於這些物件導向的概念與記憶又隨著時間還有 express 的摧殘遺失了一大半，藉由重新讀過相關技術文章並整理筆記、複習自我檢測，加上老師檢討直播的再次解說，對於這些底層運作機制有了更清晰的觀念；而實際上在學習與實作 React 時，這些 class、this、閉包、物件導向的概念也會一直出現，自己覺得這週在這樣的學習安排下，有了比較好的效果。

week17、18 學習 express，這部分當初自己花了很長時間寫作業以及理解 MVC 架構的運作，目前只完成 17 週的作業，不過對於 MVC 的分工有了一定的了解。

本週的小測驗是優化 lazy hackathon 這個速度很慢的網站，有實際 fork 一份來做練習，實際優化的項目最主要是壓縮圖片，再來就是壓縮 css、html、js 這些程式碼，一開始測試的分數只有 49 分，後來優化完有到 95 分，但還是有一部分的 css 跑版，猜測是使用 `gulp-concat` 將 css 打包成一包時出錯而遺失。
實際上去讀 Website Performance Optimization、Web.dev 還有各種 gulp plugin 與學長姐優化筆記就花了兩天的時間，考量時間壓力之下，css 跑版還有 lazy load 的部分待修正與完成，雖然優化失敗 qq，但覺得在這兩天的學習之下也獲得蠻多可貴的經驗，還有深刻了解圖片太多太大造成的困擾有多大 XD。

透過自己不斷踩雷、搞不定或是用錯 plugin 的慘痛過程（gulp 真的好好用，但 plugin 真的有夠多），將重點整理以下：
- 使用 CDN 改善網站載入時間以及刪除不需要的程式碼
- 改成 defer、async 載入所有 JS <參考資料：[[HTML] <script>中defer跟async是什麼?](https://realdennis.medium.com/html-script-%E4%B8%ADdefer%E8%B7%9Fasync%E6%98%AF%E4%BB%80%E9%BA%BC-1166ee88d18)>
- gulp 的使用、gulpfile.js 的編寫（`.pipe()` 使用）
- Minify、Compress 程式碼：
  - HTML：`gulp-htmlmin`
  - CSS：`gulp-clean-css`
  - JS：`gulp-uglify`（因為 `gulp-uglify` 無法編譯 ES6，所以要用 Babel 將 ES6+ 版本代碼編譯成 ES5 代碼）
- 編譯 sass/scss，搭配後處理器 `gulp-postcss`、`autoprefixer`
- `gulp-concat` 打包
- 壓縮圖片的方法：
  - PS 批次處理(看了學姊的筆記才知道「考慮到 retina 螢幕解析度為兩倍的情況，不想要有像素失真的條件下，以網頁上的圖片最大寬度為基準，將每張圖片寬度調整成 最大寬度 * 2 (px)」)
  - `gulp-imagemin` （實際使用一直失敗，應該是參數寫錯）
  - 線上壓縮網站：tinyJPG（一次處理 20 張）、squoosh（單張處理）
- 延遲載入圖片 Lazy Load：參考 [透過 lazy loading 延遲載入圖片](https://medium.com/@mingjunlu/lazy-loading-images-via-the-intersection-observer-api-72da50a884b7)
- CSS sprite：減少 HTTP request 的次數（這個還沒有實作和研究過，之後如果有機會也想練習看看，不知道指定圖片的座標會不會很難用...）