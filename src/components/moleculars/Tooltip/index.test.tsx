import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Tooltip from ".";

describe("Tooltip", () => {
  it("should render without error", () => {
    renderComponent(<Tooltip text="Tooltip" symbol="!" />);

    expectTextToBeInTheDocument("Tooltip");
  });

  it("should render with textRight", () => {
    renderComponent(
      <Tooltip text="Tooltip" symbol="!" textRight="Text Right" />,
    );

    expectTextToBeInTheDocument("Text Right");
  });

  it("should render with isClick", () => {
    renderComponent(<Tooltip text="Tooltip" symbol="!" isClick />);
    clickOn("Tooltip");
    expectTextToBeInTheDocument("Tooltip");
  });
});
