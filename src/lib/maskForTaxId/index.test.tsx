import { mask } from ".";

describe("should format according to language", () => {
  it("expects to return formatted CPF when in pt-BR", () => {
    expect(mask("11111111111", "pt-BR")).toBe("111.111.111-11");
  });

  it("expects to return formatted taxId when in en-US", () => {
    expect(mask("123456789", "en-US")).toBe("123-45-6789");
  });
});
