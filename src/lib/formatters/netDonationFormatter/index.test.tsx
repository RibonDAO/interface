import { formatNetDonation } from ".";

describe("netDonationFormatter", () => {
  it("when priceCents is passed", () => {
    expect(formatNetDonation(0.14, 100, 100, "usd")).toEqual("$0.86");
  });

  it("when priceCents is not passed", () => {
    expect(formatNetDonation(0, 100)).toEqual("1 USDC");
  });
});
