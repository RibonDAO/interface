import { renderHook } from "config/testUtils/renders";
import offerFactory from "config/testUtils/factories/offerFactory";
import { waitForPromises } from "config/testUtils";
import { Currencies } from "types/enums/Currencies";
import offersApi from "services/api/offersApi";
import useOffers from ".";

describe("useOffers", () => {
  let hook: ReturnType<typeof useOffers>;
  const data = [offerFactory()];

  beforeEach(async () => {
    offersApi.getOffers = jest.fn(() => ({ data } as any));
    const { hook: renderHookResult } = renderHook(() =>
      useOffers(Currencies.BRL, false),
    );
    await waitForPromises();
    hook = renderHookResult.result.current;
  });

  describe("#offers", () => {
    it("returns the offers from the api", () => {
      expect(hook.offers).toEqual(data);
    });
  });
});
