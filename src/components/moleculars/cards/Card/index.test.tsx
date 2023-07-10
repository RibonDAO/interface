import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Card from ".";

describe("Card", () => {
  it("should render without error", () => {
    renderComponent(
      <Card border={false} backgroundColor="white">
        <p>Card</p>
      </Card>,
    );

    expectTextToBeInTheDocument("Card");
  });
});
