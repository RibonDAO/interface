import { Languages } from "@ribon.io/shared/types";
import { maskForTaxId } from ".";

describe("should format according to language", () => {
  it("expects to return formatted CPF when in pt-BR", () => {
    expect(maskForTaxId("BRASIL", Languages.PT)).toBe("999.999.999-99");
  });

  it("expects to return formatted taxId when in en", () => {
    expect(maskForTaxId("UNITED STATES OF AMERICA (USA)", Languages.en)).toBe(
      "999-99-9999",
    );
  });
});
