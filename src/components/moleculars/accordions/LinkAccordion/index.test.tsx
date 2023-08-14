import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import LinkAccordion from ".";

const mockFn = jest.fn();

const linkProps = {
  items: [
    {
      title: "Item 1",
      handleClick: mockFn,
      leftIcon: "event_available",
    },
    {
      title: "Item 2",
      handleClick: () => {},
      leftIcon: "event_in_progress",
    },
  ],
};

describe("LinkAccordion", () => {
  it("should render without error", () => {
    renderComponent(<LinkAccordion {...linkProps} />);
    expectTextToBeInTheDocument("Item 1");
    expectTextToBeInTheDocument("Item 2");
  });

  describe("when element is clicked", () => {
    it("calls handleClick function", () => {
      renderComponent(<LinkAccordion {...linkProps} />);
      clickOn("Item 1");

      expect(mockFn).toHaveBeenCalled();
    });
  });
});
