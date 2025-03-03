export function capitalize(str) {
  const begins = str[0].toUpperCase();
  const remains = str.slice(1);
  return `${begins}${remains}`;
}
