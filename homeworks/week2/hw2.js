//首字母大寫：給定一字串，把第一個字轉成大寫之後「回傳」，若第一個字不是英文字母則忽略。
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
  }

console.log(capitalize('nick'));
console.log(capitalize('Nick'));
console.log(capitalize(',ello'));


//一開始也有寫判斷式，看了檢討，log 後發現大寫用 toUpperCase 不影響。

