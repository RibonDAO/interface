import React from "react";
import { renderComponent, clickOn } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ModalForm from ".";

describe("ModalForm", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalForm
        title="ModalForm"
        visible
        formFields={[
          {
            name: "email",
            id: "email",
            type: "email",
            placeholder: "email",
            required: true,
          },
        ]}
        onFormSubmit={() => {}}
        initialState={{ email: "email" }}
      />,
    );

    expectTextToBeInTheDocument("ModalForm");
  });

  it("should handle on submit", () => {
    const handleOnSubmitMock = jest.fn();
    renderComponent(
      <ModalForm
        title="ModalForm"
        visible
        formFields={[
          {
            name: "email",
            id: "email",
            type: "email",
            placeholder: "email",
            required: true,
          },
        ]}
        onFormSubmit={handleOnSubmitMock}
        primaryButtonText="click"
        initialState={{ email: "email" }}
      />,
    );
    clickOn("click");
    expect(handleOnSubmitMock).toHaveBeenCalled();
  });

  describe("when the component is not visible and don't have title", () => {
    it("does not show", () => {
      renderComponent(
        <ModalForm
          formFields={[]}
          onFormSubmit={() => {}}
          initialState={{ email: "email" }}
        />,
      );
      expectTextNotToBeInTheDocument("ModalForm");
    });
  });
});
