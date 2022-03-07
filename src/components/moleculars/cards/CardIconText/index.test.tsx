import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import CardIconText from ".";

describe("CardIconText", () => {
  it("renders the passed text", () => {
    renderComponent(<CardIconText text="CardIconText" icon="" />);

    expectTextToBeInTheDocument("CardIconText");
  });

  describe("when a right component is passed", () => {
    it("renders the right component", () => {
      renderComponent(
        <CardIconText text="text" icon="" rightComponent={<div>test</div>} />,
      );

      expectTextToBeInTheDocument("test");
    });
  });
});
