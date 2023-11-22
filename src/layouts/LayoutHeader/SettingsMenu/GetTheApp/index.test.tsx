import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GetTheApp from ".";

describe("GetTheAppItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<GetTheApp />);
    expectTextToBeInTheDocument("Get more tickets");
  });
});
