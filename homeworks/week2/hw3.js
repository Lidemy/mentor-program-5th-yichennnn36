//反轉字串:給定一個字串，請「印出」反轉之後的樣子
function reverse(str) {
  let ans = '';
  for (let i = str.length - 1; i >= 0; i--) {
    ans += str[i];
  }
  console.log(ans);
}

reverse('hello');
reverse('yoyoyo');
reverse('1abc2');
reverse('1,2,3,2,1');