import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import RadioAccordion from ".";

const props = {
  items: [
    {
      title: "Credit Card",
      children: <div>Credit Card is Visible</div>,
    },
    {
      title: "Google Play",
      onClick: () => {},
    },
    {
      title: "Apple Pay",
      onClick: () => {},
    },
  ],
};

describe("RadioAccordion", () => {
  it("should render without error", () => {
    renderComponent(<RadioAccordion {...props} />);

    expectTextToBeInTheDocument("Credit Card");
    expectTextToBeInTheDocument("Google Play");
    expectTextToBeInTheDocument("Apple Pay");
  });

  describe("when the component is not visible and don't have text", () => {
    it("does not show", () => {
      renderComponent(<RadioAccordion {...props} />);

      expectTextNotToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when the component is visible and has a current", () => {
    it("shows the current item", () => {
      renderComponent(<RadioAccordion {...props} current={0} />);

      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when element is clicked", () => {
    it("shows the children", () => {
      renderComponent(<RadioAccordion {...props} />);

      clickOn("Credit Card");
      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });
});
