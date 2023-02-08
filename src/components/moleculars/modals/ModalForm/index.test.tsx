import React from "react";
import { renderComponent, clickOn } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { mockNewLogEventFunction } from "setupTests";
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
        primaryButton={{
          text: "click",
          onClick: handleOnSubmitMock,
        }}
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

  describe("when the modal is visible and has an eventName", () => {
    const eventName = "test";
    const eventParams = { test: "test" };
    const action = "view";
    it("logs an event", () => {
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
