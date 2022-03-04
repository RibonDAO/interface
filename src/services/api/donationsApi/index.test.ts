import donationsApi from ".";
import api from "..";

describe("donationsApi", () => {
  describe("#postDonation", () => {
    beforeEach(() => {
      // If it's a different method just change it to: post, put, delete, etc.
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      donationsApi.postDonation(1, 1, "user@test.com");

      expect(api.post).toHaveBeenCalledWith("/api/v1/donations", {
        integrationId: 1,
        nonProfitId: 1,
        email: "user@test.com",
      });
    });
  });
});
