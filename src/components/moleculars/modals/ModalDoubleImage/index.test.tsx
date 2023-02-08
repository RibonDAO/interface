import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import { mockNewLogEventFunction } from "setupTests";
import ModalDoubleImage from ".";

describe("ModalDoubleImage", () => {
  it("should render without error", () => {
    renderComponent(<ModalDoubleImage title="ModalDoubleImage" visible />);

    expectTextToBeInTheDocument("ModalDoubleImage");
  });

  describe("when has passed a function on buttons", () => {
    it("calls the passed function when clicked primary button", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalDoubleImage
          title="ModalDoubleImage"
          visible
          primaryButton={{
            text: "button",
            onClick: mockFunction,
          }}
        />,
      );
      clickOn("button");

      expect(mockFunction).toHaveBeenCalled();
    });

    it("calls the passed function when clicked secondary button", () => {
      const mockFunction = jest.fn();
      renderComponent(
        <ModalDoubleImage
          title="ModalDoubleImage"
          visible
          secondaryButton={{
            text: "button",
            onClick: mockFunction,
          }}
        />,
      );
      clickOn("button");

      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe("when has double images", () => {
    it("renders double images", () => {
      renderComponent(
        <ModalDoubleImage
          title="ModalDoubleImage"
          visible
          leftImage="left"
          rightImage="right"
        />,
      );

      expect(screen.getByAltText("leftImageAlt")).toBeDefined();
      expect(screen.getByAltText("rightImageAlt")).toBeDefined();
    });
  });

  describe("when has a highlighted text", () => {
    it("renders highlighted text", () => {
      renderComponent(
        <ModalDoubleImage
          title="ModalDoubleImage"
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
      renderComponent(<ModalDoubleImage />);
      expectTextNotToBeInTheDocument("ModalDoubleImage");
    });
  });

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    const action = "view";
    it("logs an event", () => {
      renderComponent(
        <ModalDoubleImage
          visible
          eventName={eventName}
          eventParams={eventParams}
        />,
      );
      expect(mockNewLogEventFunction).toHaveBeenCalledWith(
        action,
        eventName,
        eventParams,
      );
    });
  });
});
