import { generateUrlSignature, verifyUrlSignature } from ".";

const URL = "www.google.com";
const VALID_SIG =
  "191347bfe55d0ca9a574db77bc8648275ce258461450e793528e0cc6d2dcf8f5";
const INVALID_SIG = "invalid_sig";

describe("urlSignature", () => {
  describe("generateUrlSignature", () => {
    it("generates a valid signture", () => {
      const sig = generateUrlSignature(URL);

      expect(sig).toBe(VALID_SIG);
    });
  });

  describe("verifyUrlSignature", () => {
    it("returns true for a valid signature", () => {
      const result = verifyUrlSignature(URL, VALID_SIG);

      expect(result).toBe(true);
    });

    it("returns false for an invalid signature", () => {
      const result = verifyUrlSignature(URL, INVALID_SIG);

      expect(result).toBe(false);
    });
  });
});
