## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. <select> 
* 用來建立下拉式選單，讓使用者可以從許多選項中選擇出一個或多個
* <select> 做為選單的容器，裡面用 <option> 標籤來建議選項 

```
<select>
    <option>請選擇你最愛的水果</option>
    <option>蘋果</option>
    <option>葡萄</option>
    <option>香蕉</option>
    ...
    ...
</select>
```

此外，<select> 標籤上可以加屬性 (attributes)
* name：聲明欄位名稱
* disabled：將欄位設定為禁用的狀態，是一個布林 (boolean) 屬性
* required：將欄位設定為必填，是一個布林 (boolean) 屬性
* selected：設定預先選取此選項，是一個布林 (boolean) 屬性
* value：指定如果選了該選項，表單要傳送什麼值給遠端伺服器，如果沒設定 value，預設是送 <option> 的內容

2. <object> 
* 用來在網頁中嵌入外部內容，嵌入不同檔案類型的瀏覽器外掛內容 (plugins)，像是嵌入 Flash、PDF 等

```
//嵌入 Flash
<object data="move.swf" type="application/x-shockwave-flash"></object>

//嵌入 PDF
<object type="application/pdf"
        data="example.pdf"
    		width="250"
    		height="200">
</object>
```

3. <del>
* 用來標示被刪除的文字內容

***

參考資料：[HTML 教學](https://www.fooish.com/html/)


## 請問什麼是盒模型（box modal）

在 CSS 裡面，html 的每個元素都可被視作為一個盒子，可以針對這個盒子去做調整。
這些盒子就是 Box Ｍodel，由物件內到外，依序的組成元素包含：

* content：物件本身的內容
* padding：內容外，border 內的空間
* border：包覆內容的框線
* margin：最外層的空間，包覆著 content、padding、border

**補充**
1. 因為 padding 跟 border 都是往外面延伸，如果要賦予值，都會影響 box 的整體高度寬度。

小技巧：
假設今天需要一個 box 是 100*100，需要加外框卻不想此 box 因此變大，就可以使用另外一個屬性：
**box-sizing**
 * content-box：預設屬性，就是我們一般作用得模式。
 * border-box：用這個屬性的話，就會把 padding 等考慮進來，而自動做內縮調整。

 2. padding、margin 也是往外延伸，但 padding（內邊距）會把內容撐開、而 margin（外邊距）則是調整離容器外的距離


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

html標籤元素會有一個預設的display屬性：

* inline（行內元素）：
  * 常見區塊元素標籤：<span>、<a>。
  * 元素在同一行呈現，圖片或文字均不換行，也不會影響其版面配置。
  * 不可設定長寬，元素的寬高由它的內容撐開。margin：只對左右邊距有影響，上下邊距不影響、padding：會把內容撐開但實際上對上下的其他元素沒有影響。

* block（區塊元素）：
  * 常見區塊元素標籤：<div>、<li>、<p>、<h1>。
  * 元素將會在網頁上呈現自動換行的效果。
  * 元素寬度預設會撐到最大，使其占滿整個容器，可以設定長寬、margin、padding，但仍會占滿一整行。

* inline-block：
  * 結合以上兩種的優點，以 inline 的方式呈現，但同時擁有 block 的屬性。
  * 可設定元素的寬高/margin/padding。
  * 可水平排列。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* static：HTML 預設值，按照瀏覽器預設配置自動排版，不會受到 top、bottom、left、right 之影響。
* relative（相對定位）：針對原本的定位點作定位，且區塊原本的空間仍會保留不會消失。
* absolute（絕對定位）：脫離原本預設的版面配置，重新以「基準元素」為起點，可以自由指定配置位置。而原本應該顯示這個區塊的位置，後續的元素會自動遞補上去。若沒有指定基準元素，預設是以 body (整個視窗)作定位，基準元素為往上找不是 static 的元素。
* fixed（固定定位）：針對 viewport 作定位，在電腦上也可以直接想成對瀏覽器作定位，即便頁面捲動，還是會固定在相同的位置。



參考資料：
* Lidemy [FE101]前端基礎
* [position 屬性的基礎概念](https://medium.com/ui-ux%E7%B7%B4%E5%8A%9F%E5%9D%8A/position-%E5%B1%AC%E6%80%A7%E7%9A%84%E5%9F%BA%E7%A4%8E%E6%A6%82%E5%BF%B5-5931254e5203)
