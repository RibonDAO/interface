import { formatFee } from ".";

describe("feeFormatter", () => {
  it("when currency is passed", () => {
    expect(formatFee(0.86, "usd")).toEqual("$0.86");
  });

  it("when currency is not passed", () => {
    expect(formatFee(0.86, undefined)).toEqual("0 USDC");
  });
});
