## 請以自己的話解釋 API 是什麼
API（Application Programming Interface），中文為**應用程式介面**，是應用程式與應用程式之間的橋樑。當你需要別人的資料時，你可以透過他所提供的 API 來拿到資料；反之，當對方需要你的資料時，你可以提供介面（API）供對方存取所需的資料，廣義來說，藉由 API，可以讓雙方**交換資料**。

以下舉例：

> 要如何讀取檔案？ 透過作業系統提供的 API 來讀取檔案。
> 要如何拿到 Facebook 的好友資料？ 串接 Facebook 提供的 API 來存取好友資料（串接 API：丟 request -> 獲得 response）。
> 別人要如何從我這邊拿資料？ 透過我提供的 API。

參考資料：
[API 到底是什麼？ 用白話文帶你認識](https://medium.com/codingbar/api-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E7%94%A8%E7%99%BD%E8%A9%B1%E6%96%87%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98-95f65a9cfc33)


## 請找出三個課程沒教的 HTTP status code 並簡單介紹

什麼是 HTTP 狀態碼（Status Codes）？

HTTP 狀態碼是伺服器對瀏覽器請求的回應，當去到一個網站時，瀏覽器發送一個請求（request）至伺服器，而伺服器會用一個三位數的代碼來回應瀏覽器的請求，這個就是 HTTP 狀態碼。

狀態碼類別：
* 1xx - 連接正在進行
* 2xx - 請求成功完成
* 3xx - 請求重新導向
* 4xx - 用戶端發生錯誤
* 5xx - 伺服器端發生錯誤

以下列出三個沒教的 HTTP status code：

* `400` Bad Request - 錯誤的要求，可能格式錯誤的請求語法或無效的請求訊息，伺服器不能或不會處理該請求。
* `401` Unauthorized - 未認證，可能需要登入或 Token。
* `508` Loop Detected - 伺服器在處理請求時陷入無窮迴圈。

另外查資料的時候有看到老師寫的文章 [搶救茶壺大作戰：418 I am a teapot](https://blog.techbridge.cc/2019/06/15/iam-a-teapot-418/)，雖然不是標準的 HTTP 狀態碼，但覺得蠻有趣的，沒想到也會有這種狀態碼！


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL：'http://restaurantLibrary'

| 說明           | Method   | path          | 參數                  | example
| --------      | -------- | --------       | --------             | -------- |
| 回傳所有餐廳資料 | GET      | /restaurant    | _limit:限制回傳資料數量 | /restaurant?_limit=50    |
| 回傳單一餐廳資料 | GET      | /restaurant/:id| x                    | /restaurant/5   |
| 刪除餐廳資料    | DELETE   | /restaurant/:id| x                    | x        |
| 新增餐廳資料    | POST     | /restaurant    | name: 餐廳名          | x        |
| 更改餐廳資料    | PATCH    | /restaurant/:id| name: 餐廳名          | x        |


參考資料：
homeworks_week4 裡面的 API 文件 
