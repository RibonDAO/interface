import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardTooltip from ".";

describe("CardTooltip", () => {
  it("should render without error", () => {
    renderComponent(
      <CardTooltip
        tooltipText="text"
        tooltipSymbol="!"
        idTooltip="cardTooltip"
      />,
    );

    expectTextToBeInTheDocument("!");
  });

  it("when the tooltip is clicked", () => {
    renderComponent(
      <CardTooltip
        tooltipText="text"
        tooltipSymbol="!"
        idTooltip="cardTooltip"
      />,
    );
    clickOn("!");

    expectTextToBeInTheDocument("text");
  });
});
