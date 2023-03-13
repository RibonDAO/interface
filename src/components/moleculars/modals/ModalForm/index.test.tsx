import React from "react";
import { renderComponent, clickOn } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { mockNewLogEventFunction } from "setupTests";
import Ticket from "assets/images/ticket.svg";
import { screen } from "@testing-library/react";
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
          title="ModalFormTitle"
        />,
      );
      expectTextNotToBeInTheDocument("ModalFormTitle");
    });
  });

  describe("ModalForm with onValuesChange", () => {
    it("should call onValuesChange when values changes", () => {
      const onValuesChange = jest.fn();

      renderComponent(
        <ModalForm
          formFields={[
            {
              name: "email-field",
              id: "email",
              type: "email",
              placeholder: "email-placeholder",
              required: true,
            },
          ]}
          onFormSubmit={() => {}}
          initialState={{ email: "startValue" }}
          onValuesChange={onValuesChange}
          visible
          eventName="test"
        />,
      );
      expect(onValuesChange).toHaveBeenCalled();
    });
  });

  describe("ModalError with icon", () => {
    it("should render the icon", () => {
      renderComponent(
        <ModalForm
          formFields={[]}
          onFormSubmit={() => {}}
          initialState={{ email: "email" }}
          visible
          icon={Ticket}
        />,
      );
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("ModalError with secondaryButton", () => {
    it("should render the secondaryButton", () => {
      const onClick = jest.fn();
      renderComponent(
        <ModalForm
          formFields={[]}
          onFormSubmit={() => {}}
          initialState={{ email: "email" }}
          visible
          secondaryButton={{
            text: "secondaryButton",
            onClick,
          }}
        />,
      );
      expectTextToBeInTheDocument("secondaryButton");
    });
  });

  describe("when passing onClose", () => {
    it("should render withoutError", () => {
      const onClose = jest.fn();
      renderComponent(
        <ModalForm
          onClose={onClose}
          formFields={[]}
          onFormSubmit={() => {}}
          initialState={{ email: "email" }}
          title="title"
          visible
        />,
      );
      expect(onClose).not.toHaveBeenCalled();
      expectTextToBeInTheDocument("title");
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
