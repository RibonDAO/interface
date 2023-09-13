import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import IntegrationBanner from ".";

describe("IntegrationBanner", () => {
  it("should render without error", () => {
    renderComponent(<IntegrationBanner />);

    expectTextToBeInTheDocument("IntegrationBanner");
  });
});
