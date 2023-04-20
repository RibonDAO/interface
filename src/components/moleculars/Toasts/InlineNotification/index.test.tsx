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
        firstLink="Link 1"
        secondLink="Link 2"
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
    const onFirstLinkClick = jest.fn();
    const onSecondLinkClick = jest.fn();

    beforeEach(() => {
      renderComponent(
        <InlineNotification
          title="title"
          description="description"
          type="success"
          firstLink="firstLink"
          secondLink="secondLink"
          onFirstLinkClick={onFirstLinkClick}
          onSecondLinkClick={onSecondLinkClick}
        />,
      );
    });

    it("calls the onLinkClick", () => {
      clickOn("firstLink");
      clickOn("secondLink");

      expect(onFirstLinkClick).toHaveBeenCalled();
      expect(onSecondLinkClick).toHaveBeenCalled();
    });
  });
});
