import { nonProfitFactory, userFactory } from "@ribon.io/shared/config";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SignedInSection from ".";

describe("SignedInSection", () => {
  const nonProfit = nonProfitFactory();
  const user = userFactory();

  beforeEach(() => {
    renderComponent(<SignedInSection />, {
      locationState: {
        nonProfit,
      },
      currentUserProviderValue: {
        currentUser: user,
      },
    });
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Your donation");
  });
});
