import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardTooltip from ".";

describe("CartTextImageTooltip", () => {
  it("should render without error", () => {
    renderComponent(
      <CardTooltip
        tooltipText="text"
        tooltipSymbol="!"
        idTooltip="cardTooltip"
      />,
    );

    expectTextToBeInTheDocument("CartTextImageTooltip");
  });
});
