import donationImpactsApi from ".";
import api from "..";

describe("donationImpactsApi", () => {
  describe("#getDonationImpact", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      donationImpactsApi.getDonationImpact();

      expect(api.get).toHaveBeenCalledWith("/api/v1/users/impact");
    });
  });
});
