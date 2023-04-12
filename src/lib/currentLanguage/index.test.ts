import { formattedLanguage, normalizedLanguage } from ".";

describe("currentLanguage", () => {
  describe("formattedLanguage", () => {
    it("should return the correct language", () => {
      expect(formattedLanguage("en-US")).toEqual("en");
      expect(formattedLanguage("pt-BR")).toEqual("pt-BR");
      expect(formattedLanguage(null)).toEqual("pt-BR");
    });
  });

  describe("normalizedLanguage", () => {
    it("should return the correct language", () => {
      expect(normalizedLanguage()).toEqual("pt-BR");
    });
  });
});
