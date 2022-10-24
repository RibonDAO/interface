import { maskForTaxId } from ".";

describe("should format according to language", () => {
  it("expects to return formatted CPF when in pt-BR", () => {
    expect(maskForTaxId("11111111111", true)).toBe("111.111.111-11");
  });

  it("expects to return formatted taxId when in en-US", () => {
    expect(maskForTaxId("123456789", false)).toBe("123-45-6789");
  });
});
