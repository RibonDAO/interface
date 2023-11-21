import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Item from ".";

describe("GetTheAppItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<Item text="Test" onClickHandler={() => {}} />);
    expectTextToBeInTheDocument("Test");
  });
});
