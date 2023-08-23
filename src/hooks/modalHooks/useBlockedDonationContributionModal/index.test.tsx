import {
  expectPageToNavigateTo,
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn, renderComponent } from "config/testUtils";
import { useBlockedDonationContributionModal } from ".";

jest.mock("hooks/useLanguage", () => ({
  __esModule: true,
  useLanguage: () => ({
    currentLang: "pt-BR",
  }),
}));

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: () => ({
    contribution: {
      image: "test-image-url",
      impact: "This is a test impact",
      value: 100,
    },
  }),
}));

describe("useBlockedDonationContributionModal", () => {
  function Wrapper() {
    const { showBlockedDonationContributionModal } =
      useBlockedDonationContributionModal();

    return (
      <div>
        <button type="button" onClick={showBlockedDonationContributionModal}>
          Show
        </button>
      </div>
    );
  }

  describe("when the screen is on mobile size", () => {
    beforeEach(() => {
      renderComponent(<Wrapper />);
    });

    it("does not render the modal", () => {
      expectTextNotToBeInTheDocument("You used all your tickets");
    });

    it("renders the modal when show is called", () => {
      clickOn("Show");
      expectTextToBeInTheDocument("You used all your tickets");
    });

    it("redirect when donate button is clicked", () => {
      clickOn("Show");
      clickOn("Donate R$ 100");

      expectPageToNavigateTo("/promoters/recurrence", {
        search: "offer=0&target=non_profit&target_id=&currency=BRL",
      });
    });
  });
});
