import causeFactory from "config/testUtils/factories/causeFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";

import { renderHook } from "@testing-library/react-hooks";
import usePayable from ".";

const mockCause = causeFactory({ name: "💊 Health", id: 1 });
const mockNonProfit = nonProfitFactory({ name: "🌳 Environment", id: 1 });

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCauses: () => ({
    causes: [mockCause],
    refetch: jest.fn(),
  }),
  useNonProfits: () => ({
    nonProfits: [mockNonProfit],
    refetch: jest.fn(),
  }),
}));

describe("usePayable", () => {
  it("should return a cause", () => {
    const { result } = renderHook(() => usePayable("cause", "1"));
    expect(result.current).toEqual(mockCause);
  });

  it("should return a non profit", () => {
    const { result } = renderHook(() => usePayable("non_profit", "1"));
    expect(result.current).toEqual(mockNonProfit);
  });
});
