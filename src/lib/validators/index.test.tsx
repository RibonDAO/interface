import { isValidEmail, isValidUuid } from ".";

describe("should check email", () => {
  it("expects to return false", () => {
    expect(isValidEmail("invalid_email")).toBe(false);
  });

  it("expects to return true", () => {
    expect(isValidEmail("foo@bar.com")).toBe(true);
  });
});

describe("should check uuid", () => {
  it("expects to return false", () => {
    expect(isValidUuid("invalid_uuid")).toBe(false);
  });

  it("expects to return true", () => {
    expect(isValidUuid("c5c680cf-3a7a-4ea1-ade6-e5eb77e83c88")).toBe(true);
  });
});
