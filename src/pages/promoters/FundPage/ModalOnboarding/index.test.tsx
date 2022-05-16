import { renderComponent } from "config/testUtils";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ModalOnboarding, { FUND_MODAL_ONBOARDING_VIEWED_KEY } from ".";

describe("ModalOnboarding", () => {
  describe("when there is no fund modal onboarding viewed key", () => {
    beforeEach(() => {
      removeLocalStorageItem(FUND_MODAL_ONBOARDING_VIEWED_KEY);
    });

    it("should render without error", () => {
      renderComponent(<ModalOnboarding />);

      expectTextToBeInTheDocument("Ribon’s Donation Fund");
    });
  });

  describe("when there is a fund modal onboarding viewed key", () => {
    beforeEach(() => {
      setLocalStorageItem(FUND_MODAL_ONBOARDING_VIEWED_KEY, "true");
    });

    it("should not be visible", () => {
      renderComponent(<ModalOnboarding />);

      expectTextNotToBeInTheDocument("Ribon’s Donation Fund");
    });
  });
});
