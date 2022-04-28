import impactApi from ".";
import api from "..";

describe("impactApiApi", () => {
  const userId = 1;

  describe("#getImpact", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      impactApi.getImpact(userId);

      expect(api.get).toHaveBeenCalledWith("/api/v1/users/1/impacts");
    });
  });

  describe("#getDonationsCount", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      impactApi.getDonationsCount(userId);

      expect(api.get).toHaveBeenCalledWith("/api/v1/users/1/donations_count");
    });
  });
});
