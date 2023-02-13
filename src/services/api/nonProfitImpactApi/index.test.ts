import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { Currencies } from "@ribon.io/shared/types";
import nonProfitImpactApi from ".";
import api from "..";

describe("nonProfitImpactApi", () => {
  describe("#postImpactByNonProfit", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      const nonProfit = nonProfitFactory();
      nonProfitImpactApi.postImpactByNonProfit(
        nonProfit.id,
        10,
        Currencies.USD,
      );

      expect(api.post).toHaveBeenCalledWith(
        "/api/v1/givings/impact_by_non_profit",
        {
          nonProfitId: nonProfit.id,
          value: 10,
          currency: Currencies.USD,
        },
      );
    });
  });
});
