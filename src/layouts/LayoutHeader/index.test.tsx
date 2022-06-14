import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import React from "react";
import LayoutHeader from ".";

describe("LayoutHeader", () => {
  it("should render without errors", () => {
    renderComponent(<LayoutHeader />);
  });

  it("should donation ticket modal when click in ticket button", () => {
    renderComponent(<LayoutHeader />);

    clickOn("1");
    expectTextToBeInTheDocument("You got a donation ticket");
  });
});
