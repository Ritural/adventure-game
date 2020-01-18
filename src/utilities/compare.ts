export function compare<T>(a: T, b: T, key: keyof T) {
  let x: T[keyof T] | number = a[key];
  let y: T[keyof T] | number = b[key];

  if (typeof x === 'string') {
    x = parseInt(x, 10) || 0;
  }
  if (typeof y === 'string') {
    y = parseInt(y, 10) || 0;
  }

  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
