import { formatFromWei } from "./index";

describe("#formatFromWei", () => {
  it("formats a wei to number", () => {
    expect(formatFromWei("1000000000000000000")).toEqual("1.00");
  });

  it("formats a wei to number with decimals", () => {
    expect(formatFromWei("1000000000000000000", 4)).toEqual("1.0000");
  });
});
