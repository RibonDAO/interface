import React from "react";
import { renderComponent, waitForPromises } from "config/testUtils";
import { mockRequest } from "config/testUtils/test-helper";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";

import Causes from ".";

jest.mock("hooks/useImpactConversion", () => ({
  useImpactConversion: () => ({
    variation: "Control",
  }),
}));
describe("Causes", () => {
  const cause1 = causeFactory({
    id: 1,
    name: "cause1",
    active: true,
    withPoolBalance: true,
  });

  const cause2 = causeFactory({
    id: 2,
    name: "cause2",
    active: false,
    withPoolBalance: false,
  });

  const nonProfits = [
    nonProfitFactory({
      id: 1,
      impactDescription: "days of impact",
      impactByTicket: 2,
      cause: cause1,
    }),
    nonProfitFactory({
      id: 2,
      impactDescription: "days of impact",
      impactByTicket: 3,
      cause: cause2,
    }),
    nonProfitFactory({
      id: 3,
      impactDescription: "days of impact",
      impactByTicket: 4,
      cause: cause1,
    }),
    nonProfitFactory({
      id: 4,
      impactDescription: "days of impact",
      impactByTicket: 5,
      cause: cause2,
    }),
    nonProfitFactory({
      id: 5,
      impactDescription: "days of impact",
      impactByTicket: 6,
      cause: cause2,
    }),
  ];

  mockRequest("/api/v1/free_donation_non_profits", {
    payload: nonProfits,
  });

  mockRequest("/api/v1/free_donation_causes", {
    payload: [cause1],
  });

  mockRequest("/api/v1/users/can_donate", {
    payload: { canDonate: true },
    method: "POST",
  });

  beforeEach(async () => {
    renderComponent(<Causes />);
    await waitForPromises();
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Donate to a project");
  });

  it("renders the customer support card", () => {
    expectTextToBeInTheDocument("Access user support");
  });

  it("shows the non profit if the cause is active and has pool balance", async () => {
    nonProfits.forEach((nonProfit) => {
      if (nonProfit.cause?.active && nonProfit.cause?.withPoolBalance) {
        expectTextToBeInTheDocument(
          `Donate ${nonProfit.impactByTicket} ${nonProfit.impactDescription}`,
        );
      }
    });
  });
});
