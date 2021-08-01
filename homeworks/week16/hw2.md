程式碼如下：

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

執行順序：
### step1：進入 globalEC
進入 globalEC 並且初始化 VO & scope chain，把 globalEC 放進 call stack

```
globalEC: {
  VO: {
    i: undefined
  }
  scopeChain: [globalEC.VO]
}
```

### step2：跑迴圈，初始化 i = 0
```
globalEC: {
  VO: {
    i: 0
  }
  scopeChain: [globalEC.VO]
}
```
執行第二行，把 `console.log()` 丟進 call stack，執行完 pop，印出 `i: 0`。

### step3：執行 `setTimeout(fn, i * 1000)`
初始化 fn，並記錄 `fn[[scope]] = [globalEC.VO]`

`setTimeout()` 屬於 web API，會呼叫瀏覽器説：「幫我設定計時器 0 秒後過期，過期後把第一個參數丟到 callback queue」，`setTimeout()` 執行完後，從 call stack 裏面 pop 掉。
計時器的時間到後，就會把 fn 丟進 callback queue。

### step4：迴圈第二圈，i = 1
重複以上的動作，把 `console.log()` 丟進 call stack，執行完 pop，印出 `i: 1`。

`setTimeout()` 屬於 web API，會呼叫瀏覽器説：「幫我設定計時器 1 秒後過期，過期後把第一個參數丟到 callback queue」，`setTimeout()` 執行完後，從 call stack 裏面 pop 掉。
計時器的時間到後，就會把 fn 丟進 callback queue。

...（以上輪迴 i++）
迴圈跑完，globalEC.VO 裡的 i = 5，程式執行完畢，globalEC 被 pop，call stack 清空。

### step5：event loop
event loop 把 callback queue 裡面的 fn 丟到 call stack 執行，建立 fn EC：

```
fnEC: {
  AO: {

  }
  scopeChain: [fnEC.AO, fn[[scope]]] = [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
    i: 5 // 迴圈跑完
  }
  scopeChain: [globalEC.VO]
}

fn[[scope]] = [globalEC.VO]
```

### step6：執行 fn
把 `() => { console.log(i) }` 丟到 call stack，因為還要呼叫 `console.log(i)`，於是再把 `console.log(i)` 丟進 call stack，根據 scopeChain 找到 globalEC.VO 的 `i = 5`，印出 `5`，執行完後 pop，原本的 function 沒有要執行的東西也 pop，清空 call stack。
event loop 會繼續把 callback queue 裡面的 fn 丟到 call stack 執行。

執行結果：
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```