import { clickOn, renderComponent } from "config/testUtils";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ThirdPage from ".";

describe("onboarding - ThirdPage", () => {
  it("should render without error", () => {
    renderComponent(<ThirdPage />);

    expectTextToBeInTheDocument(
      "Before donating your ticket, here's a quick summary...",
    );
    expectTextToBeInTheDocument("What are tickets?");
    expectTextToBeInTheDocument("Who pays the tickets?");
    expectTextToBeInTheDocument("What is Ribon?");
    expectTextToBeInTheDocument("Choose project");
  });

  describe("when the user clicks on the start button", () => {
    beforeEach(() => {
      renderComponent(<ThirdPage />);
    });

    it("should navigate to the causes page", () => {
      clickOn("Choose project");
      expectPageToNavigateTo("/causes");
    });
  });
});
