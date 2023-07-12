import { Currencies, Languages } from "@ribon.io/shared/types";
import { languageByCoin } from "./index";

describe("#languageByCoin", () => {
  describe("when the language is PT", () => {
    it("returns the BRL currency", () => {
      expect(languageByCoin(Currencies.BRL)).toEqual(Languages.PT);
    });
  });

  describe("when the language is EN", () => {
    it("returns the USD currency", () => {
      expect(languageByCoin(Currencies.USD)).toEqual(Languages.en);
    });
  });
});
