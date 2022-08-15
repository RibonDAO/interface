import { renderComponent, RenderWithContextResult } from "config/testUtils";
import { fireEvent } from "@testing-library/react";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ButtonSwitch from ".";

describe("ButtonSwitch", () => {
  const mockFn = jest.fn();
  let renderResult: RenderWithContextResult;

  beforeEach(() => {
    renderResult = renderComponent(
      <ButtonSwitch leftText="PT" rightText="EN" onSwitch={mockFn} />,
    );
  });

  it("renders the left text", () => {
    expectTextToBeInTheDocument("PT");
  });

  it("renders the right text", () => {
    expectTextToBeInTheDocument("EN");
  });

  it("calls the onSwitch function with right param", () => {
    const switchButton =
      renderResult.component.container.querySelector("#switch");
    if (switchButton) fireEvent.click(switchButton);

    expect(mockFn).toHaveBeenCalledWith(false);
  });
});
