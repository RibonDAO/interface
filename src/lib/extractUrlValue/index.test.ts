import extractUrlValue from ".";

describe("extractUrlValue", () => {
  it("expects to return the redirect_to value", () => {
    const url = "https://localhost:300/auth?redirect_to=/referral/1";
    const key = "redirect_to";
    const expectedPath = "/referral/1";
    expect(extractUrlValue(key, url)).toEqual(expectedPath);
  });

  it("expects to return the token value", () => {
    const url = "https://localhost:300/test?token=valid_token";
    const key = "token";
    const expectedPath = "valid_token";
    expect(extractUrlValue(key, url)).toEqual(expectedPath);
  });

  it("expects to return undefined", () => {
    const url = "https://localhost:300/auth";
    const key = "redirect_to";
    expect(extractUrlValue(key, url)).toBeUndefined();
  });
});
