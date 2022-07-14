import { renderHook } from "config/testUtils/renders";
import { useWeb3Provider } from ".";

jest.mock("@ethersproject/providers", () => ({
  Web3Provider: jest.fn(() => ({})),
}));

describe("useWeb3Provider", () => {
  let hook: ReturnType<typeof useWeb3Provider>;

  describe("when there is the ethereum object", () => {
    beforeEach(() => {
      Object.defineProperty(window, "ethereum", {
        value: { on: jest.fn() },
        configurable: true,
        writable: true,
      });
      const { hook: renderHookResult } = renderHook(() => useWeb3Provider());
      hook = renderHookResult.result.current;
    });

    it("returns the Web3 provider", () => {
      expect(hook).toEqual({});
    });
  });

  describe("when there is no ethereum object", () => {
    beforeEach(() => {
      Object.defineProperty(window, "ethereum", {
        value: null,
        configurable: true,
        writable: true,
      });
      const { hook: renderHookResult } = renderHook(() => useWeb3Provider());
      hook = renderHookResult.result.current;
    });

    it("returns null", () => {
      expect(hook).toBeNull();
    });
  });
});
