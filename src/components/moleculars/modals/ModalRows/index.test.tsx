import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import icon from "assets/icons/ribon.svg";
import {
  expectTextToBeInTheDocument,
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
import ModalRows from ".";

jest.mock(
  "../../../atomics/LottieAnimation",
  () =>
    function () {
      return <p>animation</p>;
    },
);
describe("ModalRows", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalRows
        rowsContent={[
          {
            id: 1,
            icon,
            text: "rows",
          },
        ]}
        visible
      />,
    );

    expectTextToBeInTheDocument("rows");
  });

  it("should not show modal when visible is false", () => {
    renderComponent(
      <ModalRows
        rowsContent={[
          {
            id: 1,
            icon,
            text: "rows",
          },
        ]}
      />,
    );

    expectTextNotToBeInTheDocument("rows");
  });

  it("should render animation", () => {
    const animationData = jest.fn();
    renderComponent(<ModalRows visible animationData={animationData} />);

    expectTextToBeInTheDocument("animation");
  });

  describe("Buttons", () => {
    it("should render primary and secondary button", () => {
      renderComponent(
        <ModalRows
          rowsContent={[
            {
              id: 1,
              icon,
              text: "rows",
            },
          ]}
          visible
          primaryButtonText="click"
          secondaryButtonText="click2"
        />,
      );

      expectTextToBeInTheDocument("click");
      expectTextToBeInTheDocument("click2");
    });
    it("should call function when click primary", () => {
      const handlePrimaryButton = jest.fn();
      renderComponent(
        <ModalRows
          rowsContent={[
            {
              id: 1,
              icon,
              text: "rows",
            },
          ]}
          visible
          primaryButtonText="click"
          primaryButtonCallback={handlePrimaryButton}
        />,
      );

      clickOn("click");
      expect(handlePrimaryButton).toHaveBeenCalled();
    });

    it("should not call function when click primary button", () => {
      const handlePrimaryButton = jest.fn();
      renderComponent(
        <ModalRows
          rowsContent={[
            {
              id: 1,
              icon,
              text: "rows",
            },
          ]}
          visible
          primaryButtonText="click"
        />,
      );

      clickOn("click");
      expect(handlePrimaryButton).not.toHaveBeenCalled();
    });

    it("should call function when click secondary button", () => {
      const handleSecondaryButton = jest.fn();
      renderComponent(
        <ModalRows
          rowsContent={[
            {
              id: 1,
              icon,
              text: "rows",
            },
          ]}
          visible
          secondaryButtonText="click"
          secondaryButtonCallback={handleSecondaryButton}
        />,
      );

      clickOn("click");
      expect(handleSecondaryButton).toHaveBeenCalled();
    });

    it("should not call function when click secondary button", () => {
      const handleSecondaryButton = jest.fn();
      renderComponent(
        <ModalRows
          rowsContent={[
            {
              id: 1,
              icon,
              text: "rows",
            },
          ]}
          visible
          secondaryButtonText="click"
        />,
      );

      clickOn("click");
      expect(handleSecondaryButton).not.toHaveBeenCalled();
    });
  });
});
