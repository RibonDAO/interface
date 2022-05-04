import {
  expectImageToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import CardRoundDoubleImage from ".";

describe("CardRoundDoubleImage", () => {
  it("should render without error", () => {
    renderComponent(
      <CardRoundDoubleImage
        rightImage=""
        leftImage=""
        rightImageAlt="rightImage"
        leftImageAlt="leftImage"
      />,
    );

    expectImageToBeInTheDocument("rightImage");
    expectImageToBeInTheDocument("leftImage");
  });
});
