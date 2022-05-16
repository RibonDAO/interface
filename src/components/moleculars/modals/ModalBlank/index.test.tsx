import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ModalBlank from ".";

describe("ModalBlank", () => {
  it("should render without error", () => {
    renderComponent(
      <ModalBlank visible>
        <div>blank</div>
      </ModalBlank>,
    );

    expectTextToBeInTheDocument("blank");
  });
});
