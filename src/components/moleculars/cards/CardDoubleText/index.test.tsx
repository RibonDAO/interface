import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import CardDoubleText from ".";

describe("CardDoubleText", () => {
  it("renders the passed text", () => {
    renderComponent(
      <CardDoubleText title="text" subtitle="subtitle" icon="" />,
    );

    expectTextToBeInTheDocument("text");
    expectTextToBeInTheDocument("subtitle");
  });

  describe("when a right component is passed", () => {
    it("renders the right component", () => {
      renderComponent(
        <CardDoubleText
          title="text"
          subtitle="subtitle"
          icon=""
          rightComponent={<div>test</div>}
        />,
      );

      expectTextToBeInTheDocument("test");
    });
  });
});
