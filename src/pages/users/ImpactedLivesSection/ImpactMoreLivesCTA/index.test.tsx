import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactMoreLivesCTA from ".";

describe("ImpactMoreLivesCTA", () => {
  it("renders without errors", () => {
    renderComponent(<ImpactMoreLivesCTA />);

    expectTextToBeInTheDocument("Donate");
  });
});
