import { screen } from "@testing-library/react";
import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectPageToNavigateTo,
  expectTextNotToBeInTheDocument,
} from "config/testUtils/expects";
import LogoutItem from ".";

const closeMenu = jest.fn();

describe("LogoutItem", () => {
  it("should render without errors", () => {
    renderComponent(<LogoutItem closeMenu={closeMenu} />);
    expectTextToBeInTheDocument("Sign Out");
  });

  describe("when the sign out button is clicked", () => {
    beforeEach(() => {
      renderComponent(<LogoutItem closeMenu={closeMenu} />, {
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
      clickOn("Cancel");
      expectTextToBeInTheDocument("user@email.com");
    });

    it("Confirms sign out", async () => {
      const signoutButton = screen.getByTestId("DialogPrimaryButton");
      clickOn(signoutButton);
      waitForPromises();
      expectTextNotToBeInTheDocument("user@email.com");
    });

    it("Signs out and returns to initial page", () => {
      clickOn("Sign out");
      expectPageToNavigateTo("/causes");
    });
  });
});
