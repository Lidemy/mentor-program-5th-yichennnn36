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
    const [a, b, k] = lines[i].split(' ');

    if (BigInt(a) === BigInt(b)) {
      console.log('DRAW');
    } else {
      if (Number(k) === 1) {
        console.log(BigInt(a) > BigInt(b) ? 'A' : 'B');
      } else {
        console.log(BigInt(a) < BigInt(b) ? 'A' : 'B');
      }
    }
  }
}
