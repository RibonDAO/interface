import { renderComponent } from "config/testUtils/renders";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import ImpactedLivesCounter from ".";

describe("ImpactedLivesCounter", () => {
  beforeEach(() => {
    renderComponent(<ImpactedLivesCounter />, {
      userLevelProviderValue: {
        userExperience: 100,
      },
    });
  });

  it("renders the amount of impacted lives by the user", () => {
    expectTextToBeInTheDocument("100");
  });

  it("navigates to impact page when clicked", () => {
    clickOn("100");

    expectPageToNavigateTo("/impact");
  });
});
