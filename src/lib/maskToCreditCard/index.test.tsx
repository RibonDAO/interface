import { maskToCreditCard } from ".";

describe("should format month and year", () => {
  it("expects to return formatted with spaces", () => {
    expect(maskToCreditCard("0000111122223333")).toBe("0000 1111 2222 3333");
  });
});
