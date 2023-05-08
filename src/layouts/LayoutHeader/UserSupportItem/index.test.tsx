import React from "react";

import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import UserSupportItem from ".";

describe("UserSupportItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<UserSupportItem />);
    expectTextToBeInTheDocument("User Support");
  });
});
