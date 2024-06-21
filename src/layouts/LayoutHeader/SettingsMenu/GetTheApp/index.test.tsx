import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GetTheApp from ".";

jest.mock("contexts/currentUserContext", () => ({
  __esModule: true,
  ...jest.requireActual("contexts/currentUserContext"),
  useCurrentUser: () => ({
    currentUser: {
      email: "user@example.com",
    },
  }),
}));

describe("GetTheAppItem component", () => {
  it("renders the correct text", () => {
    renderComponent(<GetTheApp />);
    expectTextToBeInTheDocument("Get more tickets");
  });
});
