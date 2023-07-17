import { renderHook } from "config/testUtils/renders";
import { setLocalStorageItem } from "lib/localStorage";
import useContributionActivity, { HAS_SEEN_CONTRIBUTIONS_TODAY_KEY } from ".";

const mockLabelableContributions = jest.fn();
jest.mock("hooks/apiHooks/useContributions", () => ({
  __esModule: true,
  default: () => ({
    useLabelableContributions: mockLabelableContributions,
  }),
}));

describe("useContributionActivity", () => {
  describe("when the user has no contributions", () => {
    beforeEach(() => {
      mockLabelableContributions.mockImplementation(() => ({
        data: [],
      }));
    });

    it("returns false", () => {
      const { hook } = renderHook(() => useContributionActivity());
      expect(hook.result.current.newContributionActivity).toBeFalsy();
    });
  });

  describe("when the user has contributions", () => {
    let hookResult: any;

    beforeEach(() => {
      mockLabelableContributions.mockImplementation(() => ({
        data: [{ id: 1 }],
      }));
    });

    describe("when the user has not seen the contributions today", () => {
      beforeEach(() => {
        const { hook } = renderHook(() => useContributionActivity());
        hookResult = hook.result.current;
      });

      it("returns true", () => {
        expect(hookResult.newContributionActivity).toBeTruthy();
      });
    });

    describe("when the user has seen the contributions today", () => {
      beforeEach(() => {
        setLocalStorageItem(
          HAS_SEEN_CONTRIBUTIONS_TODAY_KEY,
          new Date().toLocaleDateString(),
        );
        const { hook } = renderHook(() => useContributionActivity());
        hookResult = hook.result.current;
      });

      it("returns false", () => {
        expect(hookResult.newContributionActivity).toBeFalsy();
      });
    });
  });
});
