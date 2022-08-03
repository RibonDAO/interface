import { removeInsignificantZeros } from ".";

describe("#removeInsignificantZeros", () => {
  describe("when the price has zero cents", () => {
    it("formats by removing the cents", () => {
      expect(removeInsignificantZeros("$20.00")).toEqual("$20");
    });
  });
});
