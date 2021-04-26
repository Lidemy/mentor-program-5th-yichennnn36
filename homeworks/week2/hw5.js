function join(arr, concatStr) {
  let ans = '';
  for (let i = 0; i < arr.length; i++) {
    ans += arr[i];
    if (i < (arr.length - 1)) {
      ans += concatStr;
    }
  }
  return ans;
}

function repeat(str, times) {
  let ans = '';
  for (let i = 0; i < times; i++) {
    ans += str;
  }
  return ans;
}

console.log(join([1, 2, 3], ''));
console.log(join(['a', 'b', 'c'], '!'));
console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log(join(['aaa', 'bb', 'c', 'dddd'], ',,'));
console.log(repeat('a', 0));
console.log(repeat('yoyo', 2));
console.log(repeat('Q_Q', 3));
