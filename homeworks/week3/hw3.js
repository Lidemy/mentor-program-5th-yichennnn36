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
});

function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    if (Number(lines[i]) === 1) {
      console.log('Composite');
    } else if (isPrime(Number(lines[i]))) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

function isPrime(n) {
  for (let i = 2; i <= n - 1; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
