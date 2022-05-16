import { Currencies } from "types/enums/Currencies";
import givingsValuesApi from ".";
import api from "..";

describe("givingsValuesApi", () => {
  describe("#getGivingsValue", () => {
    beforeEach(() => {
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      givingsValuesApi.getGivingValues(Currencies.BRL);

      expect(api.get).toHaveBeenCalledWith(
        "/api/v1/giving_values?currency=brl",
      );
    });
  });
});
