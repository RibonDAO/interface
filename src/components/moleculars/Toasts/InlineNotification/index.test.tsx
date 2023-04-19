import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import InlineNotification from ".";

describe("InlineNotification", () => {
  it("should render without error", () => {
    renderComponent(
      <InlineNotification
        type="success"
        title="Title"
        description="InlineNotification"
        link1="Link 1"
        link2="Link 2"
      />,
    );

    expectTextToBeInTheDocument("InlineNotification");
  });

  describe("when close icon is pressed", () => {
    const onCloseClick = jest.fn();

    beforeEach(() => {
      renderComponent(
        <InlineNotification
          title="title"
          description="description"
          type="success"
          onCloseClick={onCloseClick}
        />,
      );
    });

    it("hides the component", () => {
      expectTextToBeInTheDocument("title");
      expectTextToBeInTheDocument("description");

      clickOn("close");

      expectTextNotToBeInTheDocument("title");
      expectTextNotToBeInTheDocument("description");
    });

    it("calls the onCloseClick function", () => {
      clickOn("close");

      expect(onCloseClick).toHaveBeenCalled();
    });
  });

  describe("when the links are pressed", () => {
    const onLink1Click = jest.fn();
    const onLink2Click = jest.fn();

    beforeEach(() => {
      renderComponent(
        <InlineNotification
          title="title"
          description="description"
          type="success"
          link1="link1"
          link2="link2"
          onLink1Click={onLink1Click}
          onLink2Click={onLink2Click}
        />,
      );
    });

    it("calls the onLinkClick", () => {
      clickOn("link1");
      clickOn("link2");

      expect(onLink1Click).toHaveBeenCalled();
      expect(onLink2Click).toHaveBeenCalled();
    });
  });
});
