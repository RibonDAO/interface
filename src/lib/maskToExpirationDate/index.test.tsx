import { maskToExpirationDate } from ".";

describe("should format month and year", () => {
  it("expects to return formatted month and year", () => {
    expect(maskToExpirationDate("112007")).toBe("11/2007");
  });

  it("expects to return formatted with 4 numbers", () => {
    expect(maskToExpirationDate("112033")).toBe("11/2033");
  });
});
