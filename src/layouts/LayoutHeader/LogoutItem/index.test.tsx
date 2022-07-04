import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectPageToNavigateTo,
} from "config/testUtils/expects";
import React from "react";
import LogoutItem from ".";

describe("LogoutItem", () => {
  it("should render without errors", () => {
    renderComponent(<LogoutItem />);
    expectTextToBeInTheDocument("Sign Out");
  });

  describe("when the sign out button is clicked", () => {
    beforeEach(() => {
      renderComponent(<LogoutItem />, {
        currentUserProviderValue: {
          currentUser: { email: "user@email.com", id: 1 },
        },
      });
      clickOn("Sign Out");
    });

    it("render the warning modal", () => {
      expectTextToBeInTheDocument(
        "You will need to sign in again to make a new donation.",
      );
    });

    it("cancels sign out", () => {
      renderComponent(<LogoutItem />);
      clickOn("Cancel");
      expectTextToBeInTheDocument("user@email.com");
    });

    it("Confirms sign out", () => {
      clickOn("Sign out");
      expectTextToBeInTheDocument("Signed out successfully");
    });

    it("Signs out and returns to initial page", () => {
      clickOn("Sign out");
      clickOn("Ok");
      expectPageToNavigateTo("/");
    });
  });
});
