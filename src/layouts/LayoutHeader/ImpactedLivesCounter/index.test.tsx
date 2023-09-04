import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactedLivesCounter from ".";

describe("ImpactedLivesCounter", () => {
  it("renders the amount of impacted lives by the user", () => {
    renderComponent(<ImpactedLivesCounter />, {
      userLevelProviderValue: {
        userExperience: 100,
      },
    });

    expectTextToBeInTheDocument("100");
  });
});
