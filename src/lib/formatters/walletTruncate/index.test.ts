import { walletTruncate } from ".";

describe("#walletTruncate", () => {
  it("truncates the wallet", () => {
    expect(
      walletTruncate("0x6E060041D62fDd76cF27c582f62983b864878E8F"),
    ).toEqual("0x6E...8E8F");
  });
});
