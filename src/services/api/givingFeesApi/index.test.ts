import { Currencies } from "@ribon.io/shared/types";
import givingFeesApi from ".";
import api from "..";

describe("givingFeesApi", () => {
  describe("FUNCTION YOU WANT TO TEST", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      givingFeesApi.postCardFees(50, Currencies.BRL);

      expect(api.post).toHaveBeenCalledWith("/api/v1/givings/card_fees", {
        value: 50,
        currency: Currencies.BRL,
      });
    });
  });
});
