import { Currencies } from "@ribon.io/shared/types";
import offersApi from ".";
import api from "..";

describe("offersApi", () => {
  describe("#getOffers", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      offersApi.getOffers(Currencies.BRL, false);

      expect(api.get).toHaveBeenCalledWith(
        "/api/v1/givings/offers?currency=brl&subscription=false",
      );
    });
  });

  describe("#getOffer", () => {
    const offerId = 1;
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      offersApi.getOffer(offerId);

      expect(api.get).toHaveBeenCalledWith("/api/v1/givings/offers/1");
    });
  });
});
