import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SupportWithCommunityPage from ".";

describe("SupportWithCommunityPage", () => {
  it("should render without error", () => {
    renderComponent(<SupportWithCommunityPage />);

    expectTextToBeInTheDocument("SupportWithCommunityPage");
  });
});
