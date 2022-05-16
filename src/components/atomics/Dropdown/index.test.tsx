import {
  clickOn,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
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
});
