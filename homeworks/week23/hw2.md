## 為什麼我們需要 Redux？

當專案的規模一大，Container 的數量變多時，很容易會遇到多個 Container 會需要用到同樣的 state，以往的做法就是層層把資料 props 傳下去，即便中間沒有用到這項資料，但為了傳至底層，每一層都還是必須傳 props，但這樣的做法不是很好維護，也很難看出 state 是在哪一層被改動，而 Redux 的出現處理了這樣的問題，Redux 提供了另外一種方式來管理狀態，它將所有的「狀態」資料存在一個獨立的 store，所有元件不論父層獲子層都可以取得狀態的值，且可以追蹤哪個元件取用了哪個狀態以及做了什麼。

[官方文件](https://redux.js.org/understanding/thinking-in-redux/motivation)也有提到：

> As the requirements for JavaScript single-page applications have become increasingly complicated, our code must manage more state than ever before. This state can include server responses and cached data, as well as locally created data that has not yet been persisted to the server. UI state is also increasing in complexity, as we need to manage active routes, selected tabs, spinners, pagination controls, and so on.

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

根據[官方文件](https://redux.js.org/)的定義：

> Redux is a predictable state container for JavaScript apps.

它的 idea 是來自於 flux 的架構，不過 flux 主要使用 action 與 store 處理邏輯，更新邏輯還有儲存狀態由 store 處理；而 Redux 則是把狀態儲存與更新邏輯兩個職責拆開，使他們不會互相影響，核心概念是把更新邏輯放在 `Reducer` 來處理，擁有 pure function 的特性。

### Redux is a predictable？

Redux 是一個狀態容器，架構為單向資料流，狀態是 immutable Object，而所有的 State 都保存在一個 store 裡面，如果想要變動唯一的方式就是指派一個 Action，但 Action 本身並不會直接修改 State，而是交由 Reducer 每次呼叫都是使用當前的 `State：(state, action) => state`。綜合上述，使得程式的邏輯更容易預測與了解。

### Redux 核心概念

從上整理得出三大元件：

1. Store：整個 Redux 運作的核心，負責儲存整個 state tree，每個專案只會有一個 store。
2. Actions：描述發生的事件類別(type)，以及所承載的資訊(payload)。
3. Reducers：透過一個函式，負責將給定的 state 根據相對應的 action 做變化而得到新的 state。

從[官方文件](https://redux.js.org/understanding/thinking-in-redux/three-principles) 可以看到 Three Principle：

1. Single source of truth：所有 state 被存在一個樹狀物件中，放在唯一的 Store 裡。

2. State is read-only：要改變 State，只能透過指派一個 Action 交由 Reducer 來處理。

   > Because all changes are centralized and happen one by one in a strict order, there are no subtle race conditions to watch out for. As actions are just plain objects, they can be logged, serialized, stored, and later replayed for debugging or testing purposes.

3. Changes are made with pure functions：將相同的輸入丟入，永遠都會回傳相同的輸出，並且不對任何該函數以外的任何作用域產生影響。

### Redux 資料流

![](https://note.pcwu.net/assets/images/2017-03-04-redux-intro-864c6.png)

## 該怎麼把 React 跟 Redux 串起來？

Redux 是一個獨立的 library，可以單獨使用，但 Redux 非常適合解決 React 的狀態管理問題，因此經常搭配使用(以下使用 hooks 來寫)。

1. 使用 [react-redux](https://react-redux.js.org/introduction/getting-started) API 套件安裝

2. 接著在最上層 import 以下，並創建 store，再將程式碼以 `<Provider />` 包住。

```javascript
//...
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <APP />
  </Provider>,
  document.getElementById("root")
);
```

3. 完成上述步驟後就可以以在子元件中利用 `useSelector` 這個 Hooks，將 Component 需要的 State 取出：

```javascript
import React from "react";
import { useSelector } from "react-redux";

const App = () => {
  // 使用 useSelector 取出 Store 保管的 state
  const todoList = useSelector((state) => state.todoList);
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo}</li>
      ))}
    </ul>
  );
};

export default App;
```

4. 要觸發 Reducer 的話使用 `useDispatch`，它能夠直接回傳一個 dispatch 方法，可以直接透過它觸發 Reducer。

### Reference：

- [Redux 官方文件](https://redux.js.org/)
- [深入淺出 Redux](https://medium.com/4cats-io/%E6%B7%B1%E5%85%A5%E6%B7%BA%E5%87%BA-redux-7b08403c4957)
- [為什麼需要使用 Redux 在專案上](https://blog.yyisyou.tw/bff9cac8/)
- [Redux 初學筆記(一)：核心概念](https://kira-yang.medium.com/redux%E5%88%9D%E5%AD%B8%E7%AD%86%E8%A8%98-%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5-b225ff75c130)
