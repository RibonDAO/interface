import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ReferralBanner from ".";

describe("Banner Component", () => {
  it("renders ReferralBanner with no errors", () => {
    renderComponent(<ReferralBanner />);
    expectTextToBeInTheDocument("Invite your friends");
    expectTextToBeInTheDocument(
      "Whoever enters using your invite gets 1 extra ticket to start donating!",
    );
  });
});
