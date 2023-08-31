import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactedLivesCounter from ".";

jest.mock("hooks/useUserLevel", () => () => ({
  userExperience: 100,
}));

describe("ImpactedLivesCounter", () => {
  it("renders the amount of impacted lives by the user", () => {
    renderComponent(<ImpactedLivesCounter />);

    expectTextToBeInTheDocument("100");
  });
});
