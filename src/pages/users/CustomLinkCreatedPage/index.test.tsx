import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CustomLinkCreatedPage from ".";

describe("ContributionStatsPage", () => {
  it("renders without error", () => {
    renderComponent(<CustomLinkCreatedPage />);

    expectTextToBeInTheDocument("Awesome! Your link was created successfully.");
  });
});
