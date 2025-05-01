export function reverseString(str) {
  const orderedChars = str.split("");
  let reversed = [];
  for (let i = orderedChars.length - 1; i >= 0; i--) {
    reversed.push(str[i]);
  }
  return reversed.join("");
}
