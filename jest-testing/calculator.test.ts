import { add, subtract, multiply, divide } from "./calculator";

describe("calculator", () => {
  test("add: adds two numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 5)).toBe(4);
    expect(add(0, 0)).toBe(0);
  });

  test("subtract: subtracts second number from first", () => {
    expect(subtract(5, 2)).toBe(3);
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(-3, -2)).toBe(-1);
  });

  test("multiply: multiplies two numbers", () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(-2, 5)).toBe(-10);
    expect(multiply(0, 100)).toBe(0);
  });

  test("divide: divides first number by second", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(-9, 3)).toBe(-3);
    expect(divide(0, 5)).toBe(0);
  });

  test("divide: dividing by 0 results in Infinity or -Infinity", () => {
    expect(divide(10, 0)).toBe(Infinity);
    expect(divide(-10, 0)).toBe(-Infinity);
  });
});
