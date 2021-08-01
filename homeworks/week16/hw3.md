程式碼如下：

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

### step1：進入 globalEC
進入 globalEC 並且初始化 VO & scope chain
設置 function 的 `[[scope]]`，所以 fn 這個 function 的 `[[scope]]` 就會是 `globalEC.scopeChain` 也就是 `globalEC.VO`。

```
globalEC: {
  VO: {
    a: undefined
    fn: function
  }
  scopeChain: [globalEC.VO]
}
```

### step2：執行程式碼
跑了 `var a = 1` 後碰到 `fn()`，要準備進入到 fn 的 EC，而在進入之前會是：

```
globalEC: {
  VO: {
    a: 1
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = globalEC.scopeChain = [globalEC.VO]
```

### step3：進入 fn EC 
初始化 fn，建立 EC & AO

```
fnEC: {
  AO: {
    a: undefined
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```

### step4：執行 fn 中的程式碼
1. `console.log(a)` // undefined
2. 
```
fnEC: {
  AO: {
    a: 5,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[scope]] = [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```
3. `console.log(a)` // a = 5
a++ // a = 6

### step5：進入 fn2 EC
初始化，建立 EC ＆ AO
```
fn2EC: {
  AO: {
    // 為空
  },
  scopeChain: [fn2EC.AO, fn2.[[scope]]] = [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC: {
  AO: {
    a: 6,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[scope]] = [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```

### step6：執行 fn2 中的程式碼
1. `console.log(a)` // a = 6
在 fn2EC.AO 找不到就往上找 fnEC.AO

2. a = 20，在 fn2EC.AO 找不到就往 fnEC.AO 放
b = 100，在 fn2EC.AO 找不到、fnEC.AO 也找不到就往 global 放

```
fn2EC: {
  AO: {
    // 為空
  },
  scopeChain: [fn2EC.AO, fn2.[[scope]]] = [fn2EC.AO, [fnEC.AO, globalEC.VO]]
}

fnEC: {
  AO: {
    a: 20,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[scope]] = [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    b: 100,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```

### step7：fn2() 執行完，繼續執行 fn 中的程式碼
```
fnEC: {
  AO: {
    a: 20,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
    a: 1,
    b: 100,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```
`console.log(a)` // a = 20

### step8：fn 執行完後離開，繼續往下執行程式碼
```
globalEC: {
  VO: {
    a: 1,
    b: 100,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]

```
`console.log(a)` // a = 1

### step9：a = 10 賦值
```
globalEC: {
  VO: {
    a: 10,
    b: 100,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```

### step10：往下執行
```
globalEC: {
  VO: {
    a: 10,
    b: 100,
    fn: function
  }
  scopeChain: [globalEC.VO]
}

fn.[[scope]] = [globalEC.VO]
```
`console.log(a)` // a = 10
`console.log(b)` // b = 100

執行結果：
```
undefined
5
6
20
1
10
100
```
