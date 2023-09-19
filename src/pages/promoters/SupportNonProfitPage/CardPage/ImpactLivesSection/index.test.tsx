import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ImpactLivesSection from ".";

jest.mock("@growthbook/growthbook-react", () => ({
  useExperiment: () => ({
    value: true,
  }),
}));

describe("ImpactLivesSection", () => {
  it("renders without errors", () => {
    renderComponent(<ImpactLivesSection />);

    expectTextToBeInTheDocument(
      "With just R$10 you can change the lives of 20 people and raise your donor level!",
    );
  });
});
