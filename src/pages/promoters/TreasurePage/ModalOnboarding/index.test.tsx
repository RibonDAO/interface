import { renderComponent } from "config/testUtils";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ModalOnboarding, { TREASURE_MODAL_ONBOARDING_VIEWED_KEY } from ".";

describe("ModalOnboarding", () => {
  describe("when there is no treasure modal onboarding viewed key", () => {
    beforeEach(() => {
      removeLocalStorageItem(TREASURE_MODAL_ONBOARDING_VIEWED_KEY);
    });

    it("should render without error", () => {
      renderComponent(<ModalOnboarding />);

      expectTextToBeInTheDocument("Ribon’s Donation Treasure");
    });
  });

  describe("when there is a treasure modal onboarding viewed key", () => {
    beforeEach(() => {
      setLocalStorageItem(TREASURE_MODAL_ONBOARDING_VIEWED_KEY, "true");
    });

    it("should not be visible", () => {
      renderComponent(<ModalOnboarding />);

      expectTextNotToBeInTheDocument("Ribon’s Donation Treasure");
    });
  });
});
