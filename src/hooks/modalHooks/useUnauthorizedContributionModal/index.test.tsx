import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn, renderComponent } from "config/testUtils";
import { useUnauthorizedContributionModal } from ".";

jest.mock("hooks/useLanguage", () => ({
  __esModule: true,
  useLanguage: () => ({
    currentLang: "pt-BR",
  }),
}));

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

describe("useUnauthorizedContributionModal", () => {
  function Wrapper() {
    const { showUnauthorizedContributionModal } =
      useUnauthorizedContributionModal();

    return (
      <div>
        <button type="button" onClick={showUnauthorizedContributionModal}>
          Show
        </button>
      </div>
    );
  }

  describe("UnauthorizedContributionModal", () => {
    beforeEach(() => {
      renderComponent(<Wrapper />);
    });

    it("does not render the modal", () => {
      expectTextNotToBeInTheDocument("Sign in to continue donating");
    });

    it("renders the modal when show is called", () => {
      clickOn("Show");
      expectTextToBeInTheDocument("Sign in to continue donating");
      expectTextToBeInTheDocument(
        "Please, sign in to your account created with to continue your donation.",
      );
    });
  });
});
