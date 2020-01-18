const MIN = 1;

// @TODO Add a true (or close to it) random number generator
export function rollDice(sides: number, count: number): number[] {
  const max = Math.floor(sides);

  const total = [];
  for (let d = 0; d < count; d++) {
    const result = Math.floor(Math.random() * (max - MIN + 1)) + MIN;
    total.push(result);
  }

  return total;
}
