import { renderHook } from "@testing-library/react-hooks";
import useBreakpoint from ".";

const MOBILE_SIZE = 500;
const PAD_SIZE = 700;
const DESKTOP_SIZE = 1200;

describe("useBreakpoint", () => {
  let current: ReturnType<typeof useBreakpoint>;

  describe("when the screen is on mobile size", () => {
    beforeEach(() => {
      Object.assign(global, { innerWidth: MOBILE_SIZE });
      const { result } = renderHook(() => useBreakpoint());
      current = result.current;
    });

    it("returns isMobile true", () => {
      expect(current.isMobile).toBeTruthy();
    });

    it("returns isPad false", () => {
      expect(current.isPad).toBeFalsy();
    });

    it("returns isDesktop false", () => {
      expect(current.isDesktop).toBeFalsy();
    });
  });

  describe("when the screen is on pad size", () => {
    beforeEach(() => {
      Object.assign(global, { innerWidth: PAD_SIZE });
      const { result } = renderHook(() => useBreakpoint());
      current = result.current;
    });

    it("returns isMobile false", () => {
      expect(current.isMobile).toBeFalsy();
    });

    it("returns isPad true", () => {
      expect(current.isPad).toBeTruthy();
    });

    it("returns isDesktop false", () => {
      expect(current.isDesktop).toBeFalsy();
    });
  });

  describe("when the screen is on desktop size", () => {
    beforeEach(() => {
      Object.assign(global, { innerWidth: DESKTOP_SIZE });
      const { result } = renderHook(() => useBreakpoint());
      current = result.current;
    });

    it("returns isMobile false", () => {
      expect(current.isMobile).toBeFalsy();
    });

    it("returns isPad false", () => {
      expect(current.isPad).toBeFalsy();
    });

    it("returns isDesktop true", () => {
      expect(current.isDesktop).toBeTruthy();
    });
  });
});
