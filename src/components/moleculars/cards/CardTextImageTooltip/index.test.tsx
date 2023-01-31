import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardTextImageTooltip from ".";

describe("CartTextImageTooltip", () => {
  it("should render without error", () => {
    renderComponent(
      <CardTextImageTooltip tooltipText="text" tooltipSymbol="!" />,
    );

    expectTextToBeInTheDocument("CartTextImageTooltip");
  });
});
