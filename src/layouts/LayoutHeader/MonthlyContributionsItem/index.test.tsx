import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import MonthlyContributionsItem from ".";

describe("MonthlyContributionsItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<MonthlyContributionsItem />);
    expectTextToBeInTheDocument("Monthly Contributions");
  });
});
