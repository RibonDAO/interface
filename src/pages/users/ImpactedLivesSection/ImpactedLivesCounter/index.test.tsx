import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactedLivesCounter from ".";

describe("ImpactedLivesCounter", () => {
  it("renders without error", () => {
    renderComponent(<ImpactedLivesCounter impactedLivesCount={10} />);

    expectTextToBeInTheDocument("10");
    expectTextToBeInTheDocument("impacted people");
  });
});
