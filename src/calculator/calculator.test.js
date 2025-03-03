import { calculator } from "./calculator";

test("add: takes 1 + 2 and returns 3", () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test("subtract: takes 1 - 2 and returns -1", () => {
  expect(calculator.subtract(1, 2)).toBe(-1);
});

test("divide: takes 4 / 2 and returns 2", () => {
  expect(calculator.divide(4, 2)).toBe(2);
});

test("multiply: takes 1 * 2 and returns 2", () => {
  expect(calculator.multiply(1, 2)).toBe(2);
});
