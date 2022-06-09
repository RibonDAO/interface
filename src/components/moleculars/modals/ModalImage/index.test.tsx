import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectTextNotToBeInTheDocument,
  expectImageToBeInTheDocument,
} from "config/testUtils/expects";
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
          primaryButtonText="click"
          secondaryButtonText="click2"
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
          primaryButtonText="click"
          primaryButtonCallback={handlePrimaryButton}
        />,
      );

      clickOn("click");
      expect(handlePrimaryButton).toHaveBeenCalled();
    });

    it("should not call function when click in primary button", () => {
      const handlePrimaryButton = jest.fn();
      renderComponent(
        <ModalImage title="ModalImage" visible primaryButtonText="click" />,
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
          secondaryButtonText="click"
          secondaryButtonCallback={handleSecondaryButton}
        />,
      );

      clickOn("click");
      expect(handleSecondaryButton).toHaveBeenCalled();
    });

    it("should not call function when click in secondary button", () => {
      const handleSecondaryButton = jest.fn();
      renderComponent(
        <ModalImage title="ModalImage" visible secondaryButtonText="click" />,
      );

      clickOn("click");
      expect(handleSecondaryButton).not.toHaveBeenCalled();
    });
  });
});
