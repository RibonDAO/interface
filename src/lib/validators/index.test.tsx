import {
  isValidEmail,
  isValidUuid,
  isValidTitle,
  isValidUrl,
  validatePicture,
} from ".";

describe("should check email", () => {
  it("expects to return false", () => {
    expect(isValidEmail("invalid_email")).toBe(false);
  });

  it("expects to return true", () => {
    expect(isValidEmail("foo@bar.com")).toBe(true);
  });
});

describe("should check title", () => {
  it("expects to return false", () => {
    expect(
      isValidTitle(
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ",
      ),
    ).toBe(false);
  });

  it("expects to return true", () => {
    expect(isValidTitle("valid title")).toBe(true);
  });
});

describe("should check url", () => {
  it("expects to return false", () => {
    expect(isValidUrl("invalid_url")).toBe(false);
  });

  it("expects to return true", () => {
    expect(isValidUrl("https://ribon.io")).toBe(true);
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

describe("should validate picture", () => {
  it("expects to return picture.url", () => {
    expect(validatePicture("picture.url", "default_icon")).toBe("picture.url");
  });

  it("expects to return true", () => {
    expect(
      validatePicture("picture.url/platform-lookaside", "default_icon"),
    ).toBe("default_icon");
  });
});
