import {
  formattedLanguage,
  formattedShortLanguage,
  normalizedLanguage,
} from ".";

describe("currentLanguage", () => {
  describe("formattedLanguage", () => {
    it("should return the correct language", () => {
      expect(formattedLanguage("en-US")).toEqual("en");
      expect(formattedLanguage("pt-BR")).toEqual("pt-BR");
      expect(formattedLanguage(null)).toEqual("en");
    });
  });

  describe("formattedShortLanguage", () => {
    it("should return the correct language", () => {
      expect(formattedShortLanguage("en")).toEqual("en-US");
      expect(formattedShortLanguage("pt")).toEqual("pt-BR");
      expect(formattedShortLanguage(null)).toEqual("en-US");
    });
  });

  describe("normalizedLanguage", () => {
    it("should return the correct language", () => {
      expect(normalizedLanguage()).toEqual("en");
    });
  });
});
