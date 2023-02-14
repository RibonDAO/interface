import personPaymentApi from ".";
import api from "..";

describe("personPaymentApi", () => {
  describe("#getUserPersonPayments", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      const email = "usertest@ribon.io";
      personPaymentApi.getCommunityPersonPayments(email, undefined, 1, 8);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/person_payments/cause?email=${email}&page=1&per=8`,
      );
    });
  });
});
