import { renderHook } from "@testing-library/react-hooks";
import usePaymentParams from ".";

jest.mock("hooks/useQueryParams", () => ({
  __esModule: true,
  default: () => ({
    get: (key: string) => key,
  }),
}));

describe("usePaymentParams", () => {
  it("should return a valid payment object", () => {
    const { result } = renderHook(() => usePaymentParams());
    expect(result.current).toEqual({
      target: "target",
      targetId: "target_id",
      currency: "currency",
      offer: "offer",
      hasAllParams: true,
    });
  });
});
