import { maskToExpirationDate } from ".";

describe("should format month and year", () => {
  it("expects to return formatted month and year", () => {
    expect(maskToExpirationDate("1107")).toBe("11/07");
  });

  it("expects to return formatted with 4 numbers", () => {
    expect(maskToExpirationDate("11233")).toBe("11/23");
  });
});
