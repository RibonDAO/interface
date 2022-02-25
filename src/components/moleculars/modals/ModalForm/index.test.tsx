import React from "react";
import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
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
});
