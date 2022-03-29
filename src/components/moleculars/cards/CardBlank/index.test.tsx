import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import CardBlank from ".";

describe("CardBlank", () => {
  it("should render without error", () => {
    renderComponent(
      <CardBlank>
        <p>CardBlank</p>
      </CardBlank>,
    );

    expectTextToBeInTheDocument("CardBlank");
  });
});
