import { renderComponent } from "config/testUtils";
import { expectImageToBeInTheDocument } from "config/testUtils/expects";
import CardRoundImage from ".";

describe("CardRoundImage", () => {
  it("should render without error", () => {
    renderComponent(<CardRoundImage image="" logo="" logoAlt="logoAlt" />);

    expectImageToBeInTheDocument("logoAlt");
  });
});
