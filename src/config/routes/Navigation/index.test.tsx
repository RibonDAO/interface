import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import Navigation from ".";

describe("Navigation", () => {
  it("should render without error", () => {
    renderComponent(<Navigation />);

    expectTextToBeInTheDocument("Causes");
    expectTextToBeInTheDocument("Impact");
  });
});
