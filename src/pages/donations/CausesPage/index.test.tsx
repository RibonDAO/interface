import React from "react";
import { renderComponent } from "config/testUtils";
import { mockRequest } from "config/testUtils/test-helper";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import Causes from ".";

describe("Causes", () => {
  const cause1 = causeFactory({
    id: 1,
    name: "cause1",
    active: true,
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
      cause: cause1,
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
      cause: cause1,
    }),
    nonProfitFactory({
      id: 5,
      impactDescription: "days of impact",
      impactByTicket: 6,
      cause: cause1,
    }),
  ];

  mockRequest("/api/v1/non_profits", {
    payload: nonProfits,
  });

  mockRequest("/api/v1/causes", {
    payload: [cause1],
  });

  mockRequest("/api/v1/users/can_donate", {
    payload: { canDonate: true },
    method: "POST",
  });

  beforeEach(() => {
    renderComponent(<Causes />);
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Donate to a project");
  });

  it("renders the customer support card", () => {
    expectTextToBeInTheDocument("Ribon Support");
  });

  it("shows the non profit", () => {
    nonProfits.forEach((nonProfit) => {
      expectTextToBeInTheDocument(
        `Donate ${nonProfit.impactByTicket} ${nonProfit.impactDescription}`,
      );
    });
  });
});
