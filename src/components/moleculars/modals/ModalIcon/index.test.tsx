import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import theme from "styles/theme";
import ModalIcon from ".";

describe("ModalIcon", () => {
  it("should render without error", () => {
    renderComponent(<ModalIcon title="ModalIcon" visible />);

    expectTextToBeInTheDocument("ModalIcon");
  });

  describe("when has passed a function on buttons", () => {
    it("calls the passed function when clicked primary button", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalIcon
          title="ModalIcon"
          visible
          primaryButtonText="button"
          primaryButtonCallback={mockFunction}
        />,
      );
      clickOn("button");

      expect(mockFunction).toHaveBeenCalled();
    });

    it("calls the passed function when clicked secondary button", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalIcon
          title="ModalIcon"
          visible
          secondaryButtonText="button"
          secondaryButtonCallback={mockFunction}
        />,
      );
      clickOn("button");

      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe("when has a icon", () => {
    it("renders bigger icon", () => {
      renderComponent(
        <ModalIcon title="ModalIcon" visible icon="icon" biggerIcon />,
      );

      expect(screen.getByAltText("icon")).toHaveStyle(
        `display: block; 
        margin: -64px auto 16px auto;`,
      );
    });

    it("renders round icon", () => {
      renderComponent(
        <ModalIcon title="ModalIcon" visible icon="icon" roundIcon />,
      );

      expect(screen.getByAltText("icon")).toHaveStyle(
        `display: block;
        width: 96px;
        height: 96px;
        margin: -64px auto 8px auto;
        border-radius: 70px;
        object-fit: cover;`,
      );
    });
  });

  describe("when has a highlighted text", () => {
    it("renders highlighted text", () => {
      renderComponent(
        <ModalIcon
          title="ModalIcon"
          visible
          highlightedText="highlighted text"
          body="body"
        />,
      );

      expect(screen.getByText("highlighted text")).toHaveStyle(
        `margin-top: 16px;
        font-weight: bold;
        text-align: center;
        color: ${theme.colors.ribonBlack};
        font-size: 16px;`,
      );
    });
  });

  describe("when the component is not visible and don't have title", () => {
    it("does not show", () => {
      renderComponent(<ModalIcon />);
      expectTextNotToBeInTheDocument("ModalIcon");
    });
  });
});
