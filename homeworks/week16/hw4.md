程式碼如下：

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello()
obj2.hello()
hello()
```
＊ this 的值會根據你怎麼呼叫它而變得不一樣。 ＊

### step1：
把所有的 function call，都轉成利用 `call` 的形式來看，如下：
```javascript
const obj2 = obj.inner
const hello = obj.inner.hello

obj.inner.hello()
obj.inner.hello.call(obj.inner) // 轉成 call

obj2.hello()
obj2.hello.call(obj2) // 轉成 call

hello()
hello.call() // 轉成 call
```

### step2：call 的第一個參數就是 this
```javascript
obj.inner.hello() // obj.inner.hello.call(obj.inner) => 2
obj2.hello() // obj2.hello.call(obj2) => 2
hello() // hello.call() => undefined
```
＊hello() 因為沒有傳東西進去所以預設是非嚴格模式 `window`， `window.value` 為 undefined；