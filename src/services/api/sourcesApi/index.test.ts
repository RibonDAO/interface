import sourcesApi from ".";
import api from "..";

describe("sourcesApi", () => {
  describe("#postCreateSource", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      sourcesApi.postCreateSource(1, 2);

      expect(api.post).toHaveBeenCalledWith("/api/v1/sources", {
        userId: 1,
        integrationId: 2,
      });
    });
  });
});
