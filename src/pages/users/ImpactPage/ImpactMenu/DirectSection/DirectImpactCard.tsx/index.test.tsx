import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { nonProfitFactory, offerFactory } from "@ribon.io/shared/config";
import DirectImpactCard from ".";

describe("DirectImpactCard", () => {
  it("should render without error", () => {
    const personPayment = {
      id: 1,
      receiver: nonProfitFactory(),
      offer: offerFactory(),
      paidDate: "2021-01-01 00:00:00",
    };
    renderComponent(<DirectImpactCard personPayment={personPayment} />);

    expectTextToBeInTheDocument("01/01/2021");
  });
});
