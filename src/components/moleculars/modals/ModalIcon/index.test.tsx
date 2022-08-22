import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
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

      expect(screen.getByAltText("icon")).toBeDefined();
    });

    it("renders round icon", () => {
      renderComponent(
        <ModalIcon title="ModalIcon" visible icon="icon" roundIcon />,
      );

      expect(screen.getByAltText("icon")).toBeDefined();
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

      expect(screen.getByText("highlighted text")).toBeDefined();
    });
  });

  describe("when the component is not visible and don't have title", () => {
    it("does not show", () => {
      renderComponent(<ModalIcon />);
      expectTextNotToBeInTheDocument("ModalIcon");
    });
  });
});
