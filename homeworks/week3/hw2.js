const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
})

function solve(lines) {
  const [n, m] = lines[0].split(' ');
  for (let i = Number(n); i < Number(m); i++) {
    if (isNarcNum(i)) {
      console.log(i)
    }
  }
}

function isNarcNum(n) {
  let m = n;
  const digits = findDigits(n);
  let sum = 0;
  while (m !== 0) {
    const temp = m % 10;
    sum += Math.pow(temp, digits);
    m = Math.floor(m / 10);
  }
  return sum === n;
}

function findDigits(n) {
  let result = 1;
  while (n > 9) {
    n = Math.floor(n / 10);
    result++;
  }
  return result;
}
