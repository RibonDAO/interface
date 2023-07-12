import { formattedLanguage, normalizedLanguage } from ".";

describe("currentLanguage", () => {
  describe("formattedLanguage", () => {
    it("should return the correct language", () => {
      expect(formattedLanguage("en")).toEqual("en");
      expect(formattedLanguage("pt-BR")).toEqual("pt-BR");
      expect(formattedLanguage(null)).toEqual("en");
    });
  });

  describe("normalizedLanguage", () => {
    it("should return the correct language", () => {
      expect(normalizedLanguage()).toEqual("en");
    });
  });
});
