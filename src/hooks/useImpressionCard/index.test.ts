import { renderHook } from "@testing-library/react-hooks";
import impressionCardsApi from "services/api/impressionCardsApi";
import useImpressionCards from ".";

describe("useImpressionCards", () => {
  let hook: ReturnType<typeof useImpressionCards>;

  beforeEach(() => {
    const { result } = renderHook(() => useImpressionCards());
    hook = result.current;
  });

  describe("#getImpressionCard", () => {
    const id = 1;
    beforeEach(() => {
      impressionCardsApi.getImpressionCard = jest.fn(() => ({} as any));
    });

    it("calls getImpressionCard with correct params", () => {
      hook.getImpressionCard(id);

      expect(impressionCardsApi.getImpressionCard).toHaveBeenCalled();
      expect(impressionCardsApi.getImpressionCard).toHaveBeenCalledWith(id);
    });
  });
});
