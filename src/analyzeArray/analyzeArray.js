export function analyzeArray(arr) {
  return {
    average: arr.reduce((total, curr) => total + curr, 0) / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}
