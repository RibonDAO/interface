import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
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
