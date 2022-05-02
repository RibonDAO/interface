import {
  expectImageToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import CardRoundImage from ".";

describe("CardRoundImage", () => {
  it("should render without error", () => {
    renderComponent(<CardRoundImage image="" logo="" logoAlt="logoAlt" />);

    expectImageToBeInTheDocument("logoAlt");
  });
});
