import { renderHook } from "config/testUtils/renders";
import useAboutPageActivity from ".";

describe("useAboutPageActivity", () => {
  describe("when use has not seen about page", () => {
    it("returns false", () => {
      const { hook } = renderHook(() => useAboutPageActivity());
      expect(hook.result.current.hasSeenAboutPageToday).toBeFalsy();
    });
  });

  describe("when use has seen about page", () => {
    it("returns true", () => {
      const { hook } = renderHook(() => useAboutPageActivity());
      hook.result.current.setHasSeenToday();
      expect(hook.result.current.hasSeenAboutPageToday).toBeTruthy();
    });
  });
});
