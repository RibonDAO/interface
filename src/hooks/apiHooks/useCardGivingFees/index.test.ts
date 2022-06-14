import { Currencies } from "types/enums/Currencies";
import { mockRequest } from "config/testUtils/test-helper";
import { waitForPromises } from "config/testUtils";
import { renderHook } from "config/testUtils/renders";
import useCardGivingFees from ".";

describe("useCardGivingFees", () => {
  let current: ReturnType<typeof useCardGivingFees>;

  describe("when the api returns a cardGivingFee", () => {
    const payload = {
      cardFee: "R$0.50",
      cryptoFee: "R$0.50",
      cryptoGiving: "R$0.50",
      givingTotal: "R$0.50",
      netGiving: "R$0.50",
      serviceFees: "R$0.50",
    };
    mockRequest("api/v1/givings/card_fees", {
      method: "POST",
      payload,
    });

    beforeEach(async () => {
      const { hook } = renderHook(() => useCardGivingFees(50, Currencies.BRL));
      await waitForPromises();
      current = hook.result.current;
    });

    it("renders the modal when show is called", () => {
      expect(current.cardGivingFees).toEqual(payload);
    });
  });
});
