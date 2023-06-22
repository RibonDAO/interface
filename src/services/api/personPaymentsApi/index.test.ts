import personPaymentApi from ".";
import api from "..";

describe("personPaymentApi", () => {
  describe("#getCommunityPersonPayments", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, email param and headers", () => {
      const email = "usertest@ribon.io";
      personPaymentApi.getCommunityPersonPayments(email, undefined, 1, 8);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/person_payments/cause?email=${email}&page=1&per=8`,
      );
    });

    it("expects to send a get request with the correct info: url, wallet param and headers", () => {
      const walletAddress = "0x123456789";
      personPaymentApi.getCommunityPersonPayments(undefined, walletAddress);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/person_payments/cause?wallet_address=${walletAddress}&`,
      );
    });
  });

  describe("#getDirectPersonPayments", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, email param and headers", () => {
      const email = "usertest@ribon.io";
      personPaymentApi.getDirectPersonPayments(email, undefined, 1, 8);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/person_payments/non_profit?email=${email}&page=1&per=8`,
      );
    });

    it("expects to send a get request with the correct info: url, wallet param and headers", () => {
      const walletAddress = "0x123456789";
      personPaymentApi.getDirectPersonPayments(undefined, walletAddress);

      expect(api.get).toHaveBeenCalledWith(
        `/api/v1/person_payments/non_profit?wallet_address=${walletAddress}&`,
      );
    });
  });
});
