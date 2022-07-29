import { renderHook } from "config/testUtils/renders";
import useWindowSize from ".";

describe("useWindowSize", () => {
  let hook: ReturnType<typeof useWindowSize>;

  describe("when there is a window object", () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 100,
        configurable: true,
        writable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: 200,
        configurable: true,
        writable: true,
      });
      const { hook: renderHookResult } = renderHook(() => useWindowSize());
      hook = renderHookResult.result.current;
    });

    it("returns the window size", () => {
      expect(hook).toBeTruthy();
      expect(hook).toEqual({ breakpoint: "mobile", width: 100, height: 200 });
    });

    it("returns the correct breakpoint", () => {
      expect(hook.breakpoint).toBe("mobile");
    });

    it("returns the correct width", () => {
      expect(hook.width).toBe(100);
    });

    it("returns the correct height", () => {
      expect(hook.height).toBe(200);
    });
  });
});
