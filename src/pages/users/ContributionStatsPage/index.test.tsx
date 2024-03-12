import { renderComponent } from "config/testUtils/renders";
import ContributionStatsPage from "pages/users/ContributionStatsPage/index";
import { screen } from "@testing-library/react";

describe("ContributionStatsPage", () => {
  it("renders without error", () => {
    renderComponent(<ContributionStatsPage />);

    expect(screen.queryAllByTestId("spinner")).toHaveLength(1);
  });
});
