import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CommunityAddPage from ".";

describe("SupportWithCommunityPage", () => {
  it("should render without error", () => {
    renderComponent(<CommunityAddPage />);

    expectTextToBeInTheDocument("SupportWithCommunityPage");
  });
});
