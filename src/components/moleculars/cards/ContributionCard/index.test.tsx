import React from "react";
import { clickOn, renderComponent } from "config/testUtils";

import offerFactory from "config/testUtils/factories/offerFactory";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ContributionCard from ".";

describe("ContributionCard", () => {
  it("renders card with correct values and triggers donation button click when is non profit flow", () => {
    const description = "This is a test description";
    const impact = "This is a test impact";
    const value = 100;
    const offer = offerFactory();
    const nonProfit = nonProfitFactory();
    const from = "test";
    const flow = "nonProfit";

    renderComponent(
      <ContributionCard
        description={description}
        impact={impact}
        value={value}
        offer={offer}
        nonProfit={nonProfit}
        from={from}
        flow={flow}
      />,
    );

    expectTextToBeInTheDocument("This is a test description");
    expectTextToBeInTheDocument("This is a test impact");
    expectTextToBeInTheDocument("Donate R$ 100");

    clickOn("Donate");

    expectPageToNavigateTo("promoters/payment", {
      state: {
        offer,
        nonProfit,
        cause: nonProfit.cause,
        flow,
      },
    });
  });

  it("renders card with correct values and triggers donation button click when is cause flow", () => {
    const description = "This is a test description";
    const impact = "This is a test impact";
    const value = 100;
    const offer = offerFactory();
    const nonProfit = nonProfitFactory();
    const from = "test";
    const flow = "cause";

    renderComponent(
      <ContributionCard
        description={description}
        impact={impact}
        value={value}
        offer={offer}
        nonProfit={nonProfit}
        from={from}
        flow={flow}
      />,
    );

    expectTextToBeInTheDocument("This is a test description");
    expectTextToBeInTheDocument("This is a test impact");
    expectTextToBeInTheDocument("Donate R$ 100");

    clickOn("Donate");

    expectPageToNavigateTo("promoters/payment", {
      state: {
        offer,
        nonProfit,
        cause: nonProfit.cause,
        flow,
      },
    });
  });
});
