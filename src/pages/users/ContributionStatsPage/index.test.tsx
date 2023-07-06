import { renderComponent } from "config/testUtils/renders";
import ContributionStatsPage from "pages/users/ContributionStatsPage/index";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

describe("ContributionStatsPage", () => {
  it("renders without error", () => {
    renderComponent(<ContributionStatsPage />);

    expectTextToBeInTheDocument("spinner.svg");
  });
});
