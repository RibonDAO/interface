import { isValidEmail } from ".";

describe("should check email", () => {
  it("expects to return false", () => {
    expect(isValidEmail("invalid_email")).toBe(false);
  });

  it("expects to return true", () => {
    expect(isValidEmail("foo@bar.com")).toBe(true);
  });
});
