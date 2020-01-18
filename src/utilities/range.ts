export function getRange(lowEnd: number, highEnd: number): number[] {
  const list = [];
  for (var i = lowEnd; i <= highEnd; i++) {
    list.push(i);
  }
  return list;
}
