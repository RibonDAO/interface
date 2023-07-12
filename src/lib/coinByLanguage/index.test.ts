import { Languages, Currencies } from "@ribon.io/shared/types";
import { coinByLanguage } from "./index";

describe("#coinByLanguage", () => {
  describe("when the language is PT", () => {
    it("returns the BRL currency", () => {
      expect(coinByLanguage(Languages.PT)).toEqual(Currencies.BRL);
    });
  });

  describe("when the language is EN", () => {
    it("returns the USD currency", () => {
      expect(coinByLanguage(Languages.en)).toEqual(Currencies.USD);
    });
  });
});
