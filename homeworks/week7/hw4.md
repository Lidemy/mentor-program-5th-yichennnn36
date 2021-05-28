## 什麼是 DOM？
文件物件模型（Document Object Model），將 HTML 中的標籤、內容等看作是樹狀結構的物件，其中節點通常分為：Document、Element（文件內的標籤）、Text（標籤包起來的文字或空白）、Attribute（標籤屬性），節點間則有父子及兄弟兩種關係，Dom 是與 JavaScript 溝通的橋樑，可藉由 JS 存取節點來改變樣式或結構。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞機制從根節點開始往下傳遞，此為「捕獲階段（Capturing phase）」，到達 target 後為目標階段，之後再由內往外回傳回去根節點，稱為「冒泡階段（Bubbling phase）」。
任何事件在傳遞時，都會按照此順序，這也是為什麼，當觸發底層節點的事件的同時上層所有的節點也會被觸發。

舉例：
```
<!DOCTYPE html>
<html>
<body>
  <div class="outer">
    <div class="inner">
      <button class="btn">Hi</button>
    </div>
  </div>

  <script>
    addEvent('.btn')
    addEvent('.inner')
    addEvent('.outer')

    function addEvent(className) {
      document.querySelector(className).addEventListener('click', () => {
      console.log(className, '捕獲');
      }, true)

      document.querySelector(className).addEventListener('click', () => {
      console.log(className '冒泡');
      }, false)
    }
  </script>
</body>
</html>
```
我們對三層標籤加上一個監聽 click 的事件（addEventListener），並用第三個參數（boolean) 掛在各階段：**true => 捕獲階段、false => 冒泡階段**，點擊最內層的按鈕則會造成三個事件的觸發 ，log 出：
```
.outer 捕獲
.inner 捕獲
.btn 捕獲
.btn 冒泡
.inner 冒泡
.outer 冒泡
```
由上往下，再從下往上，先捕獲在冒泡。

## 什麼是 event delegation，為什麼我們需要它？
假設我們現在需要幫按鈕加上一個監聽事件，點擊後出現彈窗。
如果我們有一百個按鈕，甚至一千個按鈕，這時候替每一個按鈕加上監聽事件就會顯得非常沒有效率，尤其性質非常相似的物件。此時就可以利用事件捕獲與冒泡，針對父節點加上監聽事件，就可以處理下面所有的節點，即便是動態新增的也可以完成，這就是 event delegation！

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
* e.preventDefault()：阻止瀏覽器預設事件。
舉例像是 hw1 的表單，點擊送出按鈕或是按 enter 都會將表單送出，就可以利用 e.preventDefault() 來阻止此預設事件。
重點！！！ **加上 e.preventDefault() 後，事件還是會繼續往下傳遞。** example: hw1。

* e.stopPropagation()：加在哪邊，事件傳遞就終止在哪邊。
以第二題的例子來舉例：
```
  <script>
    addEvent('.btn')
    addEvent('.inner')
    addEvent('.outer')

    function addEvent(className) {
      document.querySelector(className).addEventListener('click', () => {
      console.log(className, '捕獲');
      }, true)

      document.querySelector(className).addEventListener('click', (e) => {
      console.log(className '冒泡');
      e.stopPropagation(); // 加在此
      }, false)
    }
  </script>
```
產生的結果為：
```
.outer 捕獲
.inner 捕獲
.btn 捕獲
.btn 冒泡
```
在 .btn 冒泡後，後續`.inner ,.outer`的冒泡階段即被終止，不會再把事件傳遞給下一個節點！
但需要注意的是，若在同一個節點上有不只一個 listener，還是會被執行到，若是想要讓同一層級的 listener 不要被執行，可以改用 e.stopImmediatePropagation()。
