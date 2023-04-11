import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InputText from ".";

describe("InputText", () => {
  it("should render without error", () => {
    renderComponent(
      <InputText name="input text" label={{ text: "InputTextLabel" }} />,
    );

    expectTextToBeInTheDocument("InputTextLabel");
  });
});
