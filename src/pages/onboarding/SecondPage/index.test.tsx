import { clickOn, renderComponent } from "config/testUtils";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import SecondPage from ".";

describe("onboarding - SecondPage", () => {
  it("should render without error", () => {
    renderComponent(<SecondPage />);

    expectTextToBeInTheDocument(
      "Here at Ribon, everything revolves around doing good!",
    );
    expectTextToBeInTheDocument(
      "Donation tickets give you that power, and you've just received your first one!",
    );
    expectTextToBeInTheDocument("Next");
  });

  describe("when the user clicks on the next button", () => {
    beforeEach(() => {
      renderComponent(<SecondPage />);
    });

    it("should navigate to the causes page", () => {
      clickOn("Next");
      expectPageToNavigateTo("/intro/step-3");
    });
  });
});
