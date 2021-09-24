## 為什麼我們需要 React？可以不用嗎？

### 什麼是 React？

> A JavaScript library for building user interfaces.

React 是 facebook 開發的一個 JS 函式庫，透過 Component 產生與管理前端的 UI，讓我們能輕鬆打造「能被重複利用的元件」。不再需要動手操作 DOM，而是直接將資料和元件進行綁定，實現自動更新，讓畫面的一切由「資料」本身決定，一旦資料改變時就牽動 UI 變動。

### React 核心特色？

- Component：React 將元素都視為一個 component（可自定義），在需要時被產生出來，達到重複使用的效果，具有擴展性，也讓管理程式碼及網頁開發變得更加容易。

- Unidirectional data flow (單向資料流)：React 的核心之一是 state，當狀態改變時，畫面也要跟著改變，換句話來說，當我們希望頁面有所變更時，使用的「狀態 state」就必須有所變更。
  資料傳遞是由上往下，由於是單向傳遞，因此子元件的狀態是無法往上傳遞。有了此限制，當遇到問題需要 Debug 時，我們只需要關注「資料存在何處，以及資料往哪個地方流去」。

- Virtual DOM：React 會將 DOM 拷貝一份成為 JavaScript 物件，也就是所謂的 VirtualDOM。當元件的狀態改變時，會先在 Virtual DOM 中進行重新繪製，完成後透過 diff 演算法，並只針對「不同之處」至實體的 DOM 中進行更新，大幅降低重新渲染的成本，讓整個網頁有更好的效能。

### 可以不使用 React 嗎？

工具的使用取決於專案的類型與背後遇到的問題，不使用 React 一樣可以寫出關注資料狀態面的程式碼，或是現今也有許多好用的框架、套件可以使用，甚至專案規模不大的情況下，直接使用原生 JS 或 jQuery 來處理還會比較方便；不過到專案規模擴大、資料流越來越複雜時，React 提供了一個在效能、可維護性、擴展性以及開發效率上相較平衡的解決方案。

## React 的思考模式跟以前的思考模式有什麼不一樣？

當網頁規模變得越大越複雜時，事件的管理、資料變化都變得更難掌握，常常需要花很多的時間處理 DOM 的取得與操作；而當資料改變後，也需要再將資料重新 render 到頁面上。也就是當畫面和資料想要保持一致時，得自行做雙向狀態維護。

當我們透過 React 在開發時，可以很輕鬆的只關注在「資料狀態」面的管理，我們的畫面由一開始設計好後就會隨著資料變動而更新，所以在學習 React 時的思考模式不能以「操作 DOM」、「修改畫面」的想法來執行;而是「所有的顯示畫面都以資料內容為基準」。

## state 跟 props 的差別在哪裡？

### state

states 是元件內部狀態，動態且可以用 setState 改值。

### props

props 是 React 父元件與子元件溝通的橋樑，是唯讀且不可改變的。
以下例子：

父元件 App 傳入子元件 name 屬性，值為 yoyo

```
const App = () => {
  return (
    <Hello name={'yoyo'} />
  )
}
export default App;
```

子元件 <Hello /> 透過 props 取得父元件傳入的 name，印出 yoyo

```
const Hello = (props) => {
  return (
    <div>{props.name}</div>
  )
}
export default Hello;
```

### 參考資料

- [激戰 ReactJS 30 天-什麼是 ReactJS ?](https://ithelp.ithome.com.tw/articles/10192491)
- [[筆記] Why React?/Mike Huang](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)
- [猴子也能看懂的 React 教學](https://j6qup3.github.io/2016/08/06/%E7%8C%B4%E5%AD%90%E4%B9%9F%E8%83%BD%E7%9C%8B%E6%87%82%E7%9A%84-React-%E6%95%99%E5%AD%B8-1/#%E4%BB%80%E9%BA%BC%E6%98%AF-React%EF%BC%9F)
