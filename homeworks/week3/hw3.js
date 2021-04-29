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
  for (let i = 1; i < lines.length; i++) {
    console.log(prime(Number(lines[i])));
  }
}

function prime(n) {
  if (n === 1) return 'Composite';
  for (let i = 2; i <= n - 1; i++) {
    if (n % i === 0) {
      return 'Composite';
    }
  }
  return 'Prime';
}
