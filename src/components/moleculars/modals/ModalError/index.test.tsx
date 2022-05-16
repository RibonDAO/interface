import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ModalError from ".";

describe("ModalError", () => {
  it("should render without error", () => {
    renderComponent(<ModalError title="ModalError" visible />);

    expectTextToBeInTheDocument("ModalError");
  });
});
