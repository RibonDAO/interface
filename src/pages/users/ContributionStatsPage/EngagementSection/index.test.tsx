import { renderComponent } from "config/testUtils/renders";
import EngagementSection from "pages/users/ContributionStatsPage/EngagementSection/index";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

describe("EngagementSection", () => {
  it("renders without error", () => {
    renderComponent(
      <EngagementSection totalDonors="80,000" totalContributors="100" />,
    );

    expectTextToBeInTheDocument("80,000");
  });
});
