import * as Constants from "utils/constants";
import { generateUrlSignature, verifyUrlSignature } from ".";

const URL = "www.google.com";
const VALID_SIG =
  "81889decdc257c3865cd188db821fbccdb8347c0e3ffc55ee37d25a498d00778";
const INVALID_SIG = "invalid_sig";

const mockConstants = Constants as { URL_SIGNATURE_KEY: string };

describe("urlSignature", () => {
  beforeEach(() => {
    mockConstants.URL_SIGNATURE_KEY = "mock_key";
  });

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
