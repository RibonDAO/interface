import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { causeFactory } from "@ribon.io/shared/config";
import CausesSelectSection from ".";

jest.mock("lib/onboardingFirstAccess", () => ({
  isFirstAccess: jest.fn(() => false),
}));

describe("CausesSelectSection", () => {
  const mockCause = causeFactory({ name: "Cause 1" });

  renderComponent(<CausesSelectSection />, {
    currentUserProviderValue: {
      signedIn: true,
    },
    causesProviderValue: {
      causesWithPoolBalance: [mockCause],
    },
  });

  it("renders all the select options", () => {
    expectTextToBeInTheDocument("All");
    expectTextToBeInTheDocument("Cause 1");
  });
});
