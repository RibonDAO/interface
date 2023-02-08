import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectTextNotToBeInTheDocument,
  expectImageToBeInTheDocument,
} from "config/testUtils/expects";
import { mockNewLogEventFunction } from "setupTests";
import ModalImage from ".";

describe("ModalImage", () => {
  it("should render without error", () => {
    renderComponent(<ModalImage title="ModalImage" visible />);

    expectTextToBeInTheDocument("ModalImage");
  });

  it("should not show modal when visible is false and don't have a title", () => {
    renderComponent(<ModalImage />);

    expectTextNotToBeInTheDocument("ModalImage");
  });

  it("should show a image", () => {
    renderComponent(
      <ModalImage
        title="ModalImage"
        image="https://picsum.photos/600/600"
        visible
      />,
    );

    expectImageToBeInTheDocument("modal-image");
  });

  describe("Buttons", () => {
    it("should render primary and secondary button", () => {
      renderComponent(
        <ModalImage
          title="ModalImage"
          visible
          primaryButton={{
            text: "click",
          }}
          secondaryButton={{
            text: "click2",
          }}
        />,
      );

      expectTextToBeInTheDocument("click");
      expectTextToBeInTheDocument("click2");
    });
    it("should call function when click in primary button", () => {
      const handlePrimaryButton = jest.fn();
      renderComponent(
        <ModalImage
          title="ModalImage"
          visible
          primaryButton={{
            text: "click",
            onClick: handlePrimaryButton,
          }}
        />,
      );

      clickOn("click");
      expect(handlePrimaryButton).toHaveBeenCalled();
    });

    it("should not call function when click in primary button", () => {
      const handlePrimaryButton = jest.fn();
      renderComponent(
        <ModalImage
          title="ModalImage"
          visible
          primaryButton={{
            text: "click",
          }}
        />,
      );

      clickOn("click");
      expect(handlePrimaryButton).not.toHaveBeenCalled();
    });

    it("should call function when click in secondary button", () => {
      const handleSecondaryButton = jest.fn();
      renderComponent(
        <ModalImage
          title="ModalImage"
          visible
          secondaryButton={{
            text: "click",
            onClick: handleSecondaryButton,
          }}
        />,
      );

      clickOn("click");
      expect(handleSecondaryButton).toHaveBeenCalled();
    });

    it("should not call function when click in secondary button", () => {
      const handleSecondaryButton = jest.fn();
      renderComponent(
        <ModalImage
          title="ModalImage"
          visible
          secondaryButton={{
            text: "click",
          }}
        />,
      );

      clickOn("click");
      expect(handleSecondaryButton).not.toHaveBeenCalled();
    });
  });

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    const action = "view";
    it("logs an event", () => {
      renderComponent(
        <ModalImage visible eventName={eventName} eventParams={eventParams} />,
      );
      expect(mockNewLogEventFunction).toHaveBeenCalledWith(
        action,
        eventName,
        eventParams,
      );
    });
  });
});
