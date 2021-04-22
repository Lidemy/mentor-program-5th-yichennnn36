function search(arr, n) {
  let L = 0;
  let R = arr.length-1;
  while (R >= L) {
    let M = Math.floor((L+R)/2);
    if (arr[M] === n) {
      return M;
    } else if (arr[M] > n) {
      R = M - 1;
    } else {
      L = M + 1;
    }
  }
  return -1;
}

console.log(search([1, 3, 10, 14, 39], 14)); //3
console.log(search([1, 3, 10, 14, 39], 299)); //-1
