import { renderHook } from "@testing-library/react-hooks";
import { useProvider } from ".";

const ethereum = {
  request: () => ({
    chainId: "0x1",
    name: "Mainnet",
  }),
};

jest.mock("@ethersproject/providers", () => ({
  Web3Provider: jest.fn(() => ({})),
}));

describe("useProvider", () => {
  it("should return an empty object if there are no query params", () => {
    window.ethereum = ethereum;
    const { result } = renderHook(() => useProvider());
    expect(result.current).toEqual({});
  });

  it("should return an empty object if there are no query params", () => {
    window.ethereum = null;
    const { result } = renderHook(() => useProvider());
    expect(result.current).toBeNull();
  });
});
