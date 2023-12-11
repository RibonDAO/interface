import { /* clickOn, */ renderComponent } from "config/testUtils";
// import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Header from ".";

describe("Header", () => {
  it("should render without error", () => {
    renderComponent(<Header />);

    // expectTextToBeInTheDocument("Change currency");
  });

  describe("when the button currency is clicked", () => {
    // beforeEach(() => {
    //   renderComponent(<Header />);
    //   clickOn("Change currency");
    // });
    // it("when the currecy is choosed", () => {
    //   expectTextToBeInTheDocument("BRL");
    // });
  });
});
