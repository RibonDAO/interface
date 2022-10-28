import { renderHook } from "@testing-library/react-hooks";
import storiesApi from "services/api/storiesApi";
import useStories from ".";

describe("useStories", () => {
  let hook: ReturnType<typeof useStories>;
  const testNonProfitId = 1;
  const data = { testNonProfitId };

  beforeEach(() => {
    const { result } = renderHook(() => useStories());
    hook = result.current;
  });

  describe("#fetchNonProfitStories", () => {
    beforeEach(() => {
      storiesApi.getNonProfitStories = jest.fn(() => ({ data } as any));
    });

    it("calls the storiesApi getNonProfitStories with correct params", () => {
      hook.fetchNonProfitStories(testNonProfitId);

      expect(storiesApi.getNonProfitStories).toHaveBeenCalledWith(
        testNonProfitId,
      );
    });

    it("returns the data fetched from the api", async () => {
      const findResultResult = await hook.fetchNonProfitStories(
        testNonProfitId,
      );
      expect(findResultResult).toEqual(data);
    });
  });
});
