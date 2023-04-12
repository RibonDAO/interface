import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Icon from ".";

describe("Icon", () => {
  it("should render without error", () => {
    renderComponent(<Icon name="Icon" color="#fff" size="30px" />);

    expectTextToBeInTheDocument("Icon");
  });
});
