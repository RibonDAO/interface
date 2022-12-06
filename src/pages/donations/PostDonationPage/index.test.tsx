import React from "react";
import { renderComponent } from "config/testUtils";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import PostDonationPage from ".";

describe("Causes", () => {
  const cause1 = causeFactory({
    id: 1,
    name: "cause1",
    active: true,
  });

  const nonProfit1 = nonProfitFactory({
    id: 1,
    impactDescription: "days of impact",
    impactByTicket: 2,
    cause: cause1,
  });

  beforeEach(() => {
    renderComponent(<PostDonationPage />, {
      locationState: {
        nonProfit: nonProfit1,
        cause: cause1,
      },
    });
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("If you wish, you can do more");
  });

  it("shows the non profit", () => {
    expectTextToBeInTheDocument("Donate directly to");
    expectTextToBeInTheDocument(nonProfit1.name);
  });

  it("shows the cause", () => {
    expectTextToBeInTheDocument("Donate as a community to");
    expectTextToBeInTheDocument(cause1.name);
  });
});
