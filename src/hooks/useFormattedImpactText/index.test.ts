import { renderHook } from "@testing-library/react-hooks";
import { useFormattedImpactText } from ".";

describe("useFormattedImpactText", () => {
  it("when the non profit is not provided", () => {
    const { result } = renderHook(() => useFormattedImpactText());
    expect(result.current.formattedImpactText()).toEqual("");
  });
});
