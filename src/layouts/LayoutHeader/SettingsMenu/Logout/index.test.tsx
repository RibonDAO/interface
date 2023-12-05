import { clickOn, renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectPageToNavigateTo,
} from "config/testUtils/expects";
import Logout from ".";

const closeMenu = jest.fn();
const reload = jest.fn();

describe("Logout", () => {
  it("should render without errors", () => {
    renderComponent(<Logout closeMenu={closeMenu} />, {
      currentUserProviderValue: {
        currentUser: { id: 1, email: "juju@ribon.io", lastDonationAt: "true" },
      },
    });
    expectTextToBeInTheDocument("Sign Out");
  });

  describe("when the sign out button is clicked", () => {
    beforeEach(() => {
      Object.defineProperty(window, "location", {
        configurable: true,
        value: { reload },
      });
      renderComponent(<Logout closeMenu={closeMenu} />, {
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

    it("Confirms sign out", () => {
      clickOn("Sign out");
      expect(reload).toHaveBeenCalled();
    });

    it("Signs out and returns to initial page", () => {
      clickOn("Sign out");
      expectPageToNavigateTo("/causes");
    });
  });
});
