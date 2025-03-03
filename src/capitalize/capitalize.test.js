import { capitalize } from "./capitalize";

test("takes a string and returns it with the 1st char capitalized", () => {
  expect(capitalize("word")).toBe("Word");
});
