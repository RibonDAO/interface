import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Header from ".";

describe("Header", () => {
  it("should render without error", () => {
    renderComponent(<Header />);

    expectTextToBeInTheDocument("Change currency");
  });
});
