import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SliderButton from ".";

describe("SliderButton", () => {
  it("should render without error", () => {
    renderComponent(<SliderButton rangeSize={10} setValue={() => {}} />);

    expectTextToBeInTheDocument("1");
  });
});
