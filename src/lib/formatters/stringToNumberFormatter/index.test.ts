import { stringToNumber } from ".";

describe("#stringToNumber", () => {
  describe("when the locale is en", () => {
    it("formats with dots being for decimals", () => {
      expect(stringToNumber("1,234,234.34", "en")).toEqual(1234234.34);
    });
  });

  describe("when the locale is pt", () => {
    it("formats with commas being for decimals", () => {
      expect(stringToNumber("1.234.234,34", "pt-BR")).toEqual(1234234.34);
    });
  });
});
