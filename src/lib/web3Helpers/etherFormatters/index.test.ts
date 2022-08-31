import { formatFromDecimals, formatFromWei, formatToDecimals } from "./index";

describe("#formatFromWei", () => {
  it("formats a wei to number", () => {
    expect(formatFromWei("1000000000000000000")).toEqual("1.00");
  });

  it("formats a wei to number with decimals", () => {
    expect(formatFromWei("1000000000000000000", 4)).toEqual("1.0000");
  });
});

describe("#formatFromDecimals", () => {
  it("formats a number according to decimals passed", () => {
    expect(formatFromDecimals(50000, 3)).toEqual(50);
  });
});

describe("#formatToDecimals", () => {
  it("formats a number to its decimal form", () => {
    expect(formatToDecimals(50, 3)).toEqual(50000);
  });
});
