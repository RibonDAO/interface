import { generateUrlSignature, verifyUrlSignature } from ".";

const URL = "www.google.com";
const VALID_SIG =
  "23e566e8a66b01df7753ed27d917fa63d8890ccb32c69301de407d7f963bb1ac";
const INVALID_SIG = "invalid_sig";

const originalEnv = process.env;

describe("urlSignature", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      URL_SIGNATURE_KEY: "mock_key",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
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
