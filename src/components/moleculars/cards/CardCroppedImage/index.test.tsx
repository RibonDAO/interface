import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardCroppedImage from ".";

describe("CardCroppedImage", () => {
  it("should render without error", () => {
    renderComponent(<CardCroppedImage />);

    expectTextToBeInTheDocument("CardCroppedImage");
  });
});
