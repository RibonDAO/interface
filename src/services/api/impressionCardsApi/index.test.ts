import impressionCardsApi from ".";
import api from "..";

describe("impressionCardsApi", () => {
  describe("#getImpressionCardsList", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      impressionCardsApi.getImpressionCard(1);

      expect(api.get).toHaveBeenCalledWith("/api/v1/impression_cards/1");
    });
  });
});
