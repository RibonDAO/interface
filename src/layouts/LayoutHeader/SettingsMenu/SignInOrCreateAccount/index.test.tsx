import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SignInOrCreateAccount from ".";

describe("GetTheAppItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<SignInOrCreateAccount />);
    expectTextToBeInTheDocument("Sign in or create a new account");
  });
});
