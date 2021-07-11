## Webpack 是做什麼用的？可以不用它嗎？
#### 模組化
在初期學習前端開發時，或是先前的作業，都是一個 js 的檔案寫到底，所有的邏輯都放在同一個檔案中。對於小型的 side project 來說可能不是什麼問題，但隨著專案的規模愈來越大，日積月累下來很可能會變成一支幾千幾萬行程式碼的大怪物。
因此為了方便團隊協作與維護專案，現今的網頁專案大多會採用模組化的方式，將所有的 JavaScript 程式碼，依照功能切成一個個的小模組（module），方便組織與管理。

#### Webpack
> Webpack 是一個模組打包工具(module bundler)。將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西，讓我們可以上傳到伺服器。

除了 JavaScript 模組之外，像是 CSS、圖片等資源，在 Webpack 中也被視為模組。
在 webpack 中可以利用各種 loader 來識別檔案類型並轉譯成瀏覽器看得懂的語法，e.g. 利用 Babel 來轉譯 JavaScript ES6-ES11 的語法、轉換 SCSS 或 less 這些 CSS 預處理器語法。
除此之外，Webpack 也可以在打包的過程中透過一些工具 plugin （第三方的擴充套件）來做到程式碼優化的工作，e.g. minify、uglify。
而 Webpack 在打包的過程中，將各模組間的相依關係繪製成相依圖(dependency graph)，依照相依圖解析並處理每一個模組，最後建置成一個或多個 bundle 。

如果不用 Webpack 當然也是可以，但上述的資源就變成我們需要自己來操作，像是自己引入所有 JavaScript 檔案、自己轉換 SCSS 語法、自己把程式碼 minify、uglify...等。
所以有了 webpack 後好處是：
* 可以模組化的管理程式
* 利用許多 loader 來識別檔案類型並轉譯
* 透過 plugin 做到程式碼的優化
* 開發時開啟 source maps 來 debug

## gulp 跟 webpack 有什麼不一樣？
#### gulp
從 gulp 的官方文件可以看到
> A toolkit to automate & enhance your workflow
> 自動化和增強工作流程的工具包

當前端要用的工具越來越多，前置作業也會來越多，例如用 SCSS 要先 compile 成 CSS ，Babel 要 compile 成 ES5 的 js，如果要部屬到線上，還要做 minify、uglify，CSS、圖片也要壓縮...等，要做的事情實在太多。
看到這邊一定會想說，奇怪，那這樣跟上面講到的 Webpack 做的事情差不多嗎？

所謂 gulp 是 Task Runners，就像是玩線上遊戲時使用的外掛程式，可以依當下情況設定自動打怪、撿寶、執行任務等，設定完成後，外掛程式就會自動替你執行。

也就是說，gulp 是一個管理很多任務的工具、library，上述每件事情都是一個 task，gulp 可以把各種 task 寫在一起，讓你用程式的方式，把這些 task 去管理說要怎麼執行，做些什麼事情，再搭配 gulp 有很多 plugin，就可以把這些東西都綁在一起，讓你很方便去管理這些任務。

#### gulp 跟 webpack 的差異
> gulp 是 Task Runners；Webpack 是 Module Bundler

Webpack 核心是「bundle」，將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西。
而 gulp 能更客製化、更彈性的自定義 task，組合任務並執行。如果想做到打包的功能任務，甚至還可以載入它的 webpack 插件來進行調用。

我想兩個工具本身的定義就很不一樣，但可以做到的事或結果有像似的地方才容易造成混淆！

## CSS Selector 權重的計算方式為何？
當一個元素被套用了太多 css 樣式時，權重值會決定誰最後勝出，最後會以權重值最高的樣式來渲染。css 權重值的計算方式描述：
> count the number of ID selectors in the selector (= a)
> count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= b)
> count the number of type selectors and pseudo-elements in the selector (= c)
> ignore the universal selector

a. id 選擇器：`#submit-btn`
b. 類別選擇器（class selector）、屬性選擇器（attribute selector）、偽類選擇器（pseudo class selector）
```css
.wrapper {} /* 類別選擇器 */
input[name=nickname] /* 屬性選擇器 */
:hover {} /* 偽類選擇器 */ 
```
c. 元素選擇器（type selector）、偽元素選擇器（pseudo selector）
```css
button {} /* 元素選擇器 */
::before {}、::after {} /* 偽元素選擇器 */
```
將權重值的計算分三個權級，而 a > b > c
而其他像是 `*` 通用選擇器、`+ > ~` combinator，沒有權級，對權重計算沒有影響。

權重值的表示通常為 0-0-0，對照上面的（a-b-c），以下範例：
```css
h1 {color: red}            /*權重值(0, 0, 1)*/
body h1 {color: green}     /*權重值(0, 0, 2)*/
h1.special { color: blue}  /*權重值(0, 1, 1)*/
#uniq { color: orange}     /*權重值(1, 0, 0)*/
```
權重值(1, 0, 0) > 權重值(0, 1, 1) > 權重值(0, 0, 2) > 權重值(0, 0, 1)
等級較高的不會被較低的比過去，所以即便有 2 個元素選擇器，也沒辦法贏過 1 個類別選擇器或是 id 選擇器（也沒有什麼逢十就進位的事情XD）。
以上述的例子，如果都套用在同一元素上，則是 id 選擇器勝出

#### 其他情況：
* 權重如果相等，後寫的樣式宣告會蓋過先前的樣式宣告

* 行內樣式宣告：直接把樣式寫在 html 元素內
```css
<h1 style="color: pink;" class="special" id="uniq">I am an H1</h1>
``` 
不管上面的 abc，行內樣式會直接覆寫掉 CSS 外部樣式表的規則，也可以想像成：1-0-0-0

* !important
`!important` 有點像是打破了選擇器的層級概念，會強迫瀏覽器套用它所指定的樣式，可以想像成：1-0-0-0-0，但通常會避免這樣的做法，請優先考慮使用權重更高的 CSS selector，而不是使用 `!important`。


#### 參考資料:
[Webpack 新手入門：模組打包工具的用途及 Webpack 工作方式的基本觀念](https://tw.alphacamp.co/blog/webpack-introduction)
[關於 Webpack，它是什麼？能夠做什麼？為什麼？怎麼做？— freeCodeCamp 的筆記](https://askie.today/what-is-webpack/)
[尋覓 webpack-04-認識 webpack-介紹 webpack 12th鐵人賽 webpack](https://ithelp.ithome.com.tw/articles/10239696)
[老余助教的作業](https://github.com/Lidemy/mentor-program-4th-zoeaeen13/blob/master/homeworks/week13/hw4.md)
[gulp-tzu 的學習筆記](https://tzutzu.coderbridge.io/2021/04/21/gulp/)
[Day14 CSS：權重 11th鐵人賽-by JinWen](https://ithelp.ithome.com.tw/articles/10221486)
[強烈推薦收藏好物 – CSS Specificity (CSS 權重一覽)](https://muki.tw/tech/css-specificity-document/)