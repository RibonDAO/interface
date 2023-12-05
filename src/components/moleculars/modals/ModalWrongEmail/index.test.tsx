import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectLogEventToHaveBeenCalledWith,
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
import ModalWrongEmail from ".";

jest.mock("lib/contactSupport");

describe("ModalWrongEmail", () => {
  it("should render without error", () => {
    const setVisible = jest.fn();
    renderComponent(<ModalWrongEmail visible setVisible={setVisible} />);

    expectTextToBeInTheDocument("Oops, incorrect e-mail");
  });

  it("should not show modal when visible is false", () => {
    const setVisible = jest.fn();
    renderComponent(
      <ModalWrongEmail visible={false} setVisible={setVisible} />,
    );

    expectTextNotToBeInTheDocument("Oops, incorrect e-mail");
  });

  describe("Button", () => {
    it("should render primary and secondary button", () => {
      renderComponent(<ModalWrongEmail visible setVisible={jest.fn()} />);

      expectTextToBeInTheDocument("Try again");
      expectTextToBeInTheDocument("Contact support");
    });
    it("should call function when click primary", () => {
      const setVisible = jest.fn();
      renderComponent(<ModalWrongEmail visible setVisible={setVisible} />);

      clickOn("Try again");
      expect(setVisible).toHaveBeenCalled();
    });

    it("should call function when click secondary button", () => {
      const setVisible = jest.fn();
      renderComponent(<ModalWrongEmail visible setVisible={setVisible} />);

      clickOn("Contact support");
      expectLogEventToHaveBeenCalledWith("supportBtn_click", {
        from: "validation_flow",
      });
    });

    it("clicks on close modal button", () => {
      const setVisible = jest.fn();
      renderComponent(<ModalWrongEmail visible setVisible={setVisible} />);

      clickOn("close");
      expect(setVisible).toHaveBeenCalled();
    });
  });
});
