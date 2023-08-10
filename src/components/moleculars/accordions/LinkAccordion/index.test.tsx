import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import LinkAccordion from ".";

const radioProps = {
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
  isRadio: true,
};

describe("LinkAccordion", () => {
  it("should render without error", () => {
    renderComponent(<LinkAccordion {...radioProps} />);

    expectTextToBeInTheDocument("Credit Card");
    expectTextToBeInTheDocument("Google Play");
    expectTextToBeInTheDocument("Apple Pay");
  });

  describe("when the component is not visible and don't have text", () => {
    it("does not show", () => {
      renderComponent(<LinkAccordion {...radioProps} />);

      expectTextNotToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when the component is visible and has a current", () => {
    it("shows the current item", () => {
      renderComponent(<LinkAccordion {...radioProps} current={0} />);

      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when element is clicked", () => {
    it("shows the children", () => {
      renderComponent(<LinkAccordion {...radioProps} />);

      clickOn("Credit Card");
      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });
});
