import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactMoreLivesCTA from ".";

jest.mock("@growthbook/growthbook-react", () => ({
  useExperiment: () => ({
    value: true,
  }),
}));

describe("ImpactMoreLivesCTA", () => {
  it("renders without errors", () => {
    renderComponent(<ImpactMoreLivesCTA from="impact_page" />);

    expectTextToBeInTheDocument("Donate");
  });
});
