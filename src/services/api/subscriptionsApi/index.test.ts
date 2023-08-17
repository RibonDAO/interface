import subscriptionsApi from ".";
import api from "..";

describe("subscriptionsApi", () => {
  describe("#getUSerSubscriptions", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      subscriptionsApi.getUserSubscriptions(1);

      expect(api.get).toHaveBeenCalledWith(
        "/api/v1/subscriptions_for_customer/1",
      );
    });
  });
});
