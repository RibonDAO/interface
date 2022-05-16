import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Givings from ".";

describe("Givings", () => {
  it("should render without error", () => {
    renderComponent(<Givings />);

    expectTextToBeInTheDocument("Your Givings");
  });
});
