## 請列出 React 內建的所有 hook，並大概講解功能是什麼

從[官方文件](https://reactjs.org/docs/hooks-reference.html)中可以看到以共有下列：

- Basic Hooks

  - useState
  - useEffect
  - useContext

- Additional Hooks
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImperativeHandle
  - useLayoutEffect
  - useDebugValue

#### useState

```javaScript
const [state, setState] = useState(initialState);
```

`useState` 會回傳一個 state 的值（保存在 React 組件內部的資料狀態），在第一次 render 時，值會跟第一個參數(initialState)一樣，以及回傳一個更新 state 的函式 `setState`（是一個「非同步」的函式），接收一個新的 state 並將 component 重新 render。
 而後續 useState 回傳的第一個值則是最後更新的 state。

##### 非同步的 setState function

由於 `setstate` 是非同步的，所以要特別注意當有用到過去的 state 來更新的話，有可能會出錯產生 bug，舉例來說：

```javaScript
const [count, setCount] = useState(0)
<button onClick={() => setCount(count + 1)}>+1</button>
```

這樣是不安全的寫法，因為「非同步」的特性沒辦法保證再次點擊時，state 已經被更新，特別是使用者如果快速點擊兩下，在預設結果 `state` 應該是 2，可是如同上述「非同步」的性質，很有可能在點擊第二下時，state 還是原本的 0，這樣結果就會變成 1 而非 2。

安全的作法則是:

```javaScript
const [count, setCount] = useState(0)
<button onClick={() => setCount(count => count + 1)}>+1</button>
```

當執行 `setCount` ，一定會等 update 完 state 後再做下一件事。

##### Lazy initial state

除了傳參數之外，也可以傳一個 function 進行比較複雜的計算來拿到初始值，該 function 只會在初始 render 時被調用：

```javaScript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### useEffect

```javaScript
useEffect(didUpdate);
```

`useEffect` 需要帶入一個函式，而函式會在「畫面渲染完成」後被呼叫。
執行順序： 執行組件 -> 渲染組件 -> 執行 useEffect 裡的函式

effect 指的是 副作用（side-effect） 的意思，在 React 中會把畫面渲染後和 React 本身無關而需要執行的動作稱做「副作用」，這些動作像是「發送 API 請求資料」、「手動更改 DOM 畫面」等等。

##### 讓 useEffect 內的函式有條件的被觸發

`useEffect` 提供了第二個參數 `dependencies`：

```javaScript
useEffect(didUpdate, [dependencies]);
```

只要每次重新渲染後， dependencies 內的元素沒有改變，任何 `useEffect` 裡面的函式就不會被執行！
第二個參數可以避免重複渲染造成的無窮迴圈，舉例來說，要是 `useEffect` 中的函式有更新 state，會觸發組件重新渲染，接著又執行 useEffect 裡的函式，接著無限循環下去...。

#### useContext

```javaScript
const value = useContext(MyContext);
```

一般來說 React 傳資料的方式是層層把資料 props 傳到下去，即便中間沒有用到這項資料，但為了傳至底層，每一層都還是必須傳 props，`useContext` 的出現解決了這個麻煩。

使用 `Context.Provider` 來包覆元件，並傳遞一個 value，先將資料透過 value 傳遞給 Provider，Provider 再將資料傳給裡面的元件，所有子元件都可以接收到 value。

不過 context 有一個問題，每當資料更新，所有使用 useContext 的 component 都會進行 render，即便該 component 需要的 state 可能根本沒有變動，所以使用上還是以不會經常更動到的值，像是 Theme，會比較適合使用。

#### useReducer

```javaScript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

當 state 邏輯變得複雜，需要操作多種 state 時可以使用。查了蠻多資料感覺是跟 Redux 有一點關係，不過進度還沒追到，現在看資料還是感覺有看沒有懂...

#### useMemo

```javaScript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

`useMemo` 第一個參數是 function，第二個參數是 [dependencies]，會回傳一個 memoized 的值，如果值沒有被更新，將會沿用上次的回傳值。當 component 重新渲染時，就能避免複雜的程式被重複執行。

#### useCallback

```javaScript
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  },[a, b]
);
```

`useCallback` 是 `useMemo` 的一種變體，用來記住一個 function instance，就等於回傳一個函式的 `useMemo`。

主要目的是避免在 component 內部宣告的函式，隨著每次 render 不斷重新被宣告與建立，導致每次拿到都是不同的 instance，如果被當成 props 往下傳給其他 components，可能導致子元件無意義地被重新渲染。因此使用 `useCallback` 幫我們把這個函式保存下來，讓它不會隨著每次組件重新執行後，因為作用域不同而得到兩個不同的函式。

#### useRef

```javaScript
const refContainer = useRef(initialValue);
```

useRef 會回傳一個值，這個值是一個有 current 屬性 的 Object。跟 `useState` 不一樣的是當更新 current 值時並不會觸發 re-render，也就表示當數值變化後並無法即時呈現在畫面中。
在 React 中若想要選取到某一元素時，可以使用 `useRef` 這個 React Hooks。

#### useImperativeHandle

```javaScript
useImperativeHandle(ref, createHandle, [deps])
```

（爬了一些文還是有點有看沒有懂 ）
整理了一下應該是可以針對一個 react component 定義他要 expose 的任何屬性，父元件就可以拿到這屬性。官方文件寫到，在元件必須透過 `forwardRef` 拿到 ref object 並塞入 `useImperativeHandle`，接著定義要 expose 哪些屬性，以及 [dependencies]。

看了一些例子使用，e.g. 多欄位表單、email editor...，可以用來簡化欄位，包成一個 fileds，接著透過 `useImperativeHandle` 釋出一個 values 屬性讓父元件可以存取到各欄位的值。

#### useLayoutEffect

跟 `useEffect` 的使用一樣，差別是 `useLayoutEffect` 被提升到了渲染畫面前、更新 DOM 後執行。
`useLayoutEffect` 本身是一個同步函式，也就是說 UI 會等 `useLayoutEffect` 中做的事情結束才會渲染。所以不要在 `useLayoutEffect` 做太多事情，否則使用者看到 UI 的間隔會拉長，導致 UX 變差。

#### useDebugValue

可以用來在 React DevTools 中顯示自訂義 hook 的標籤。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

官方的[生命週期表](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)：

- Mounting
  當 component 被建立且加入 DOM 時，其生命週期將會依照下列的順序呼叫這些方法：

1. constructor()
   觸發時機點：被 mount 之前被呼叫。
   通常會透過 `this.state` 來初始化內部的 state；或是替 event handler 來綁定 instance。
2. static getDerivedStateFromProps(nextProps, prevState)
   觸發時機點：會在一個 component 被 render 前被呼叫。
   很少用到，從官方文件可看到會根據 prop 更新內部 state，也就是只要有傳入 prop 值， 就更新 state
3. render()
4. componentDidMount()
   觸發時機點：DOM render 完後觸發。
   適合拿來做初始化、使用 setState()、拿到 API 資料。

實際範例：

```
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       test: 'testttt',
    }
    console.log('Constructor');
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    // 回傳 null 表示 state 無異動
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    console.log('render');
    return (
      <div>
        LifeCycle Test
      </div>
    )
  }
}

export default App;
```

印出的生命週期順序：
Constructor
getDerivedStateFromProps
render
componentDidMount

- Updating
  prop 或 state 有變化時，就會更新。當一個 component 被重新 render 時，其生命週期將會依照下列的順序呼叫這些方法：

1. static getDerivedStateFromProps()：如上
2. shouldComponentUpdate(nextProps, nextState)
   觸發時機點：state 改變之後，render() 之前，帶入兩個參數 `nextProps`、`nextState`，意味著如果 state 沒有改變，就不會去 call render function。
   可以避免某些不被影響到的 component 進行 re-render。如果 `shouldComponentUpdate` 回傳值為 false，就代表不會 call `render()`，也不會 call `componentDidUpdate()`。
3. render()
4. getSnapshotBeforeUpdate()
   觸發時機點：會在提交最新 render 的 output 給 DOM 之前被呼叫。
   在 DOM 改變之前先抓取一些資訊（e.g. 滾動軸位置），回傳的值會被當作一個參數傳遞給 `componentDidUpdate()`。
5. componentDidUpdate(prevProps, prevState, snapshot)
   觸發時機點：會在 component 更新後馬上被呼叫，適合在此時 call API。

實際範例：

```
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'testttt',
    }
    console.log('Constructor');
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    // 回傳 null 表示 state 無異動
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate');
    // 預設值為 true
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  changeName = () => {
    this.setState({
      name: 'changeName'
    });
  }

  render() {
    console.log('render');
    return (
      <div>
        <div>LifeCycle</div>
        <button onClick={this.changeName}>update state</button>
      </div>
    )
  }
}

export default App;

```

點擊按鈕後觸發順序：
getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate

- Unmounting

1. componentWillUnmount()
   觸發時機點：當一個 component 被從 DOM 中移除時被呼叫。
   用來清除不必要的值、內容，通常會與 `componentDidMount()` 一起使用。

## 請問 class component 與 function component 的差別是什麼？

在 React 16.8 之前主要都是以 class component 為主，因為 function component 此時並不能使用 state、也沒有 Hooks 的概念。
React 16.8 之後有了 Hooks，就能在 function component 中引入 hooks 來表示狀態，因此逐漸成為主流。

- class component：關注的是各個「生命週期」要做什麼，去想說 「didMount 要做什麼」、「update 的時候要做什麼」，每一次 「render」 時，只有執行 `render()`。
  此外使用 class component 時也要有物件導向的基本知識與觀念，才不會在使用時，因為 `this`，而產生意料之外的 bug。
- function component：每一次 render 都會把整個 function 重新執行一遍。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在 React 中表單元素的處理主要可以分為兩種：

- controlled components：受 React 所控制的資料
- Uncontrolled components：不受 React 所控制的資料

因為在瀏覽器中，像是 `<input />` 這類的表單元素本身就可以保有自己的資料狀態，可以透過 JavaScript 選到該 input 的元素後再取出值；而 React 可以幫我們處理資料狀態，將表單資料交給 React 來處理的就稱作 Controlled Components。
兩者可以達到的效果基本上是一樣的，但當我們需要對資料有更多的控制或提示畫面的處理時，使用 Controlled Components 會容易許多，比較推薦的使用也是以 controlled component 為主。

### 那何時需要使用 Uncontrolled components？

- 不涉及 state 存取及操作的行為、以及畫面顯示
  當 form 的行為不複雜時（簡單地去取得表單中某個欄位的值），或是值不涉及畫面的顯示時，可以作為 Uncontrolled Components 搭配 `useRef()` 這個 Hooks 來使用。
- 特殊 form element，如 `<input type="file" />`
  因為該元素有安全性的疑慮，JavaScript 只能取值而不能改值，也就是透過 JavaScript 可以知道使用者選擇要上傳的檔案為何（取值），但不能去改變使用者要上傳的檔案（改值）。

### 參考資料：

- [Hooks API Reference — React](https://reactjs.org/docs/hooks-reference.html)
- [關於 useState，你需要知道的事](https://medium.com/@xyz030206/%E9%97%9C%E6%96%BC-usestate-%E4%BD%A0%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E4%BA%8B-5c8c4cdda82c)
- [The Problem with React's Context API](https://leewarrick.com/blog/the-problem-with-context/)
- [Context API 效能問題 - use-context-selector 解析](https://blog.techbridge.cc/2020/09/13/use-context-selector-src-analysis/)
- [React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
- [React.Component](https://zh-hant.reactjs.org/docs/react-component.html)
- [React Class Component 生命週期 - Update/Unmount 篇](https://ithelp.ithome.com.tw/articles/10232130)
- [從實際案例看 class 與 function component 的差異#React #Web](https://blog.techbridge.cc/2020/06/13/class-function-component-and-useeffect/)
- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)
