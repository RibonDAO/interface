import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GetTheAppItem from ".";

describe("GetTheAppItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<GetTheAppItem />);
    expectTextToBeInTheDocument("Get the app");
  });
});
