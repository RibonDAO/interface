import { renderComponent } from "config/testUtils";
import { expectImageToBeInTheDocument } from "config/testUtils/expects";
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
