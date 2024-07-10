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

  it("should be disabled if rangeSize < 2 * step", () => {
    const result = renderComponent(
      <SliderButton rangeSize={7} setValue={() => {}} step={4} />,
    );

    expect(
      result.component.container.getElementsByClassName("rc-slider-disabled")
        .length,
    ).toBe(1);
  });

  it("shouldn't be disabled if rangeSize > 2 * step", () => {
    const result = renderComponent(
      <SliderButton rangeSize={9} setValue={() => {}} step={4} />,
    );

    expect(
      result.component.container.getElementsByClassName("rc-slider-disabled")
        .length,
    ).toBe(0);
  });
});
