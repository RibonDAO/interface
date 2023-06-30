import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import theme from "styles/theme";
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

  describe("when the type is passed", () => {
    const onFirstLinkClick = jest.fn();
    const onSecondLinkClick = jest.fn();

    beforeEach(() => {
      Object.assign(global, { innerWidth: 500 });
    });

    it("renders warning", () => {
      renderComponent(
        <InlineNotification
          title="title"
          description="description"
          type="warning"
          firstLink="firstLink"
          secondLink="secondLink"
          onFirstLinkClick={onFirstLinkClick}
          onSecondLinkClick={onSecondLinkClick}
        />,
      );
      expect(screen.getByTestId("icon-warning")).toHaveStyle(
        `color: ${theme.colors.feedback.warning[600]};`,
      );
    });

    it("renders error", () => {
      renderComponent(
        <InlineNotification
          title="title"
          description="description"
          type="error"
          firstLink="firstLink"
          secondLink="secondLink"
          onFirstLinkClick={onFirstLinkClick}
          onSecondLinkClick={onSecondLinkClick}
        />,
      );
      expect(screen.getByTestId("icon-dangerous")).toHaveStyle(
        `color: ${theme.colors.feedback.error[600]};`,
      );
    });

    it("renders informational", () => {
      renderComponent(
        <InlineNotification
          title="title"
          description="informational"
          type="informational"
          firstLink="firstLink"
          secondLink="secondLink"
          onFirstLinkClick={onFirstLinkClick}
          onSecondLinkClick={onSecondLinkClick}
        />,
      );
      expect(screen.getByTestId("icon-info")).toHaveStyle(
        `color: ${theme.colors.feedback.informational[600]};`,
      );
    });
  });
});
