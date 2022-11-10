import React from "react";
import { renderComponent, waitForPromises } from "config/testUtils";
import { mockRequest } from "config/testUtils/test-helper";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import causeFactory from "config/testUtils/factories/causeFactory";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import useActiveCauses from "hooks/useActiveCauses";
import CausesPage from ".";

const mockCause = causeFactory();

jest.mock("hooks/apiHooks/useCauses", () => ({
  __esModule: true,
  default: () => ({
    causes: [mockCause],
    refetch: () => {},
  }),
}));

jest.mock("hooks/useActiveCauses");

describe("Causes", () => {
  const nonProfit1 = nonProfitFactory({
    id: 1,
    impactDescription: "days of impact",
    impactByTicket: 2,
    cause: {
      id: 1,
      name: "🐵 Animal",
      active: true,
      pools: [],
    },
  });

  mockRequest("/api/v1/non_profits", {
    payload: [nonProfit1],
  });

  mockRequest("/api/v1/users/can_donate", {
    payload: { canDonate: true },
    method: "POST",
  });

  beforeEach(async () => {
    (useActiveCauses as jest.Mock).mockReturnValue([mockCause]);
    renderComponent(<CausesPage />);
    await waitForPromises();
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Donate to a project");
  });

  it("shows the non profit", () => {
    expectTextToBeInTheDocument(
      `Donate ${nonProfit1.impactByTicket} ${nonProfit1.impactDescription}`,
    );
  });

  describe("when the page state is donationFailed", () => {
    beforeEach(() => {
      renderComponent(<CausesPage />, {
        locationState: {
          failedDonation: true,
        },
      });
    });

    it("logs the donateDonationError_view event", () => {
      expectLogEventToHaveBeenCalledWith("donateDonationError_view");
    });
  });
});
