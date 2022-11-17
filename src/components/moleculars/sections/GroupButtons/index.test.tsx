import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GroupButtons from ".";

describe("GroupButtons", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(
      <GroupButtons
        onChange={mockFn}
        elements={["Element 1", "Element 2", "Element 3"]}
        nameExtractor={(element: any) => element}
      />,
    );
  });

  it("Shows the components properly", () => {
    expectTextToBeInTheDocument("Element 1");
    expectTextToBeInTheDocument("Element 2");
    expectTextToBeInTheDocument("Element 3");
  });

  it("Calls the onChange function when a button is clicked", () => {
    const button = document.querySelector("button");
    button?.click();
    expect(mockFn).toHaveBeenCalled();
  });
});
