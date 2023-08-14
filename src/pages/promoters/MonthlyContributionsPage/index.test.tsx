import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import MonthlyContributionsPage from ".";

describe("MonthlyContributionsPage", () => {
  it("should render without error", () => {
    renderComponent(<MonthlyContributionsPage />);

    expectTextToBeInTheDocument("MonthlyContributionsPage");
  });
});
