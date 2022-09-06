import { renderComponent } from "config/testUtils";
import Navigation from ".";
import { expectTextToBeInTheDocument } from "../../testUtils/expects";

describe("Navigation", () => {
  it("should render without error", () => {
    renderComponent(<Navigation />);

    expectTextToBeInTheDocument("Causes");
    expectTextToBeInTheDocument("Giving");
    expectTextToBeInTheDocument("Impact");
  });
});
