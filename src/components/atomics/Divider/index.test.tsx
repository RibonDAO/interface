import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Divider from ".";

describe("Divider", () => {
  it("should render without error", () => {
    renderComponent(<Divider text="Divider" />);

    expectTextToBeInTheDocument("Divider");
  });
});
