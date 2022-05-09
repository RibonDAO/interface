import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import ToggleSwitchText from ".";

describe("ToggleSwitchText", () => {
  it("should render without error", () => {
    renderComponent(
      <ToggleSwitchText
        leftText="text 1"
        rightText="text 2"
        onClick={() => {}}
      />,
    );

    expectTextToBeInTheDocument("text 1");
    expectTextToBeInTheDocument("text 2");
  });
});
