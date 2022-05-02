import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import Givings from ".";

describe("Givings", () => {
  it("should render without error", () => {
    renderComponent(<Givings />);

    expectTextToBeInTheDocument("Your Givings");
  });
});
