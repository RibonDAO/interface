import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SupportWithCommunityPage from ".";

describe("SupportWithCommunityPage", () => {
  it("should render without error", () => {
    renderComponent(<SupportWithCommunityPage />, {
      locationState: {
        donationAmount: "R$ 20,00",
      },
    });

    expectTextToBeInTheDocument(
      "How does the community increase your R$ 20,00 donation?",
    );
  });
});
