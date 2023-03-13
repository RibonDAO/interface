import { clickOn, renderComponent } from "config/testUtils";
import {
  expectFunctionNotToHaveBeenCalledWith,
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import Dropdown from ".";

describe("Dropdown", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <Dropdown
        name="dropdown"
        values={["test1", "test2"]}
        label="dropdown"
        onOptionChanged={mockFn}
      />,
    );
  });

  it("renders the label", () => {
    expectTextToBeInTheDocument("dropdown");
  });

  it("shows the options when clicked", () => {
    clickOn("dropdown");
    expectTextToBeInTheDocument("test1");
    expectTextToBeInTheDocument("test2");
  });

  it("calls the onOptionChanged function with correct params", () => {
    clickOn("dropdown");
    clickOn("test1");

    expect(mockFn).toHaveBeenCalledWith("test1");
  });

  it("update optionsVisible state when onClose", () => {
    clickOn("dropdown");
    clickOn("test1");
    expectTextNotToBeInTheDocument("test1");
  });

  describe("without onOptionChanged", () => {
    const onOptionChangedMock = jest.fn();
    it("should not call onOptionChanged when clicked", () => {
      renderComponent(
        <Dropdown
          name="dropdown-without-onOptionChanged"
          values={["option1", "option2"]}
          label="dropdown-without-onOptionChanged"
        />,
      );
      clickOn("dropdown-without-onOptionChanged");
      clickOn("option1");
      expectFunctionNotToHaveBeenCalledWith(onOptionChangedMock, "test1");
    });
  });
});
