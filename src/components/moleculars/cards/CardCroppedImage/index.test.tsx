import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardCroppedImage from ".";

describe("CardCroppedImage", () => {
  it("should render without error", () => {
    renderComponent(<CardCroppedImage mainText="test-main" secondaryText="test-secondary" />);

    expectTextToBeInTheDocument("test-main");
    expectTextToBeInTheDocument("test-secondary");
  });
});
