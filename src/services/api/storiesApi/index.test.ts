import storiesApi from ".";
import api from "..";

describe("storiesApi", () => {
  describe("#getNonProfitStories", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      storiesApi.getNonProfitStories(1);

      expect(api.get).toHaveBeenCalledWith("/api/v1/non_profits/1/stories");
    });
  });
});
