import personPaymentApi from ".";
import api from "..";

describe("personPaymentApi", () => {
  describe("#getUserPersonPayments", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      const email = "usertest@ribon.io";
      personPaymentApi.getCommunityPersonPayments(email);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/person_payments/${email}/causes`,
      );
    });
  });
});
