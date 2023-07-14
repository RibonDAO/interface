import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ValueInputTemplate from ".";

describe("ButtonSelectorTemplate", () => {
  it("should render without error", () => {
    renderComponent(<ValueInputTemplate value="0" onChange={() => {}} />);

    expectTextToBeInTheDocument("Or enter a custom amount to donate");
  });
});
