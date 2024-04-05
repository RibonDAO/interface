import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SliderButton from ".";

describe("SliderButton", () => {
  it("should render without error", () => {
    renderComponent(
      <SliderButton rangeSize={10} setValue={() => {}} step={1} />,
    );

    expectTextToBeInTheDocument("add");
    expectTextToBeInTheDocument("remove");
  });
});
