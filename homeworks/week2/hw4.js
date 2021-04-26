//印出因數
function printFactor(n) {
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      console.log(i);
    }
  }
}

printFactor(10); //1, 2, 5, 10

