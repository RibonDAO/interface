import {
  clickOn,
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import { DONATION_MODAL_SEEN_AT_KEY } from "lib/localStorage/constants";
import DonationTicketModal from ".";

describe("DonationTicketModal", () => {
  describe("when the person has not seen the modal", () => {
    beforeEach(() => {
      localStorage.removeItem(DONATION_MODAL_SEEN_AT_KEY);
      renderComponent(<DonationTicketModal />);
    });

    it("should be visible", () => {
      expectTextToBeInTheDocument("You got a donation ticket");
    });

    it("sets the localStorage key correctly", () => {
      expect(localStorage.getItem(DONATION_MODAL_SEEN_AT_KEY)).toBeTruthy();
    });

    it("closes the modal when clicked outside", () => {
      clickOn("Continue");

      expectTextNotToBeInTheDocument("You got a donation ticket");
    });
  });

  describe("when the person has already seen the modal", () => {
    it("should not be visible", () => {
      localStorage.setItem(DONATION_MODAL_SEEN_AT_KEY, Date.now().toString());
      renderComponent(<DonationTicketModal />);

      expectTextNotToBeInTheDocument("You got a donation ticket");
    });
  });
});
