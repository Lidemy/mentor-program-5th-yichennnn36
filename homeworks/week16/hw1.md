程式碼如下：

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

執行順序：
### step1：
先把 `console.log(1)` 丟進 call stack 執行，執行完從 call stack 拿出來。

### step2：
把第一個 `setTimeout(...)` 丟到 call stack，然後 `setTimeout()` 屬於 webAPI，會跟瀏覽器說：「幫我設定計時器 0 秒後到期，到期後把第一個參數丟進 callback queue」，`setTimeout()` 執行完後，從 call stack 裏面 pop 掉。
計時器的時間到後，就會把 `() => { console.log(2) }` 丟進 callback queue。

### step3：
把 `console.log(3)` 丟進 call stack 執行，執行完從 call stack 拿出來。

### step4：
把第二個 `setTimeout(...)` 丟到 call stack，然後 `setTimeout()` 屬於 webAPI，會跟瀏覽器說：「幫我設定計時器 0 秒後到期，到期後把第一個參數丟進 callback queue」，`setTimeout()` 執行完後，從 call stack 裏面 pop 掉。
計時器的時間到後，就會把 `() => { console.log(4) }` 丟進 callback queue。

### step5：
把 `console.log(5)` 丟進 call stack 執行，執行完從 call stack 拿出來。

### step6：
`event loop` 會不斷偵測 call stack 是否為空，如果為空就把 callback queue 裡面的東西丟到 call stack 執行。
把 `() => { console.log(2) }` 丟到 call stack，因為還要呼叫 `console.log(2)`，於是再把 `console.log(2)` 丟進 call stack，執行完後 pop，原本的 function 沒有要執行的東西也 pop，清空 call stack。
以上會再重複一次，接著 `console.log(4)`，印出 4，pop。原本的 function 沒有要執行的東西也 pop，清空 call stack。

執行結果：
```
1
3
5
2
4
```