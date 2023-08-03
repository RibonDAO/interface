import pixPaymentApi from ".";
import api from "..";

describe("pixPaymentApi", () => {
  describe("#postCreditCardPayment", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    const paymentInformation = {
      country: "Brazil",
      state: "TO",
      city: "Palmas",
      taxId: "000.000.000-00",
      offerId: 1,
      email: "usertest@ribon.io",
      integrationId: 1,
      name: "User Test"
    };

    it("expects to send a get request with the correct info: url, params and headers", () => {
      pixPaymentApi.postPixPayment(paymentInformation);

      expect(api.post).toHaveBeenCalledWith(
        "/api/v1/payments/pix",
        paymentInformation,
      );
    });
  });
});
