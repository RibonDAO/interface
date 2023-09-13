import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import IntegrationBanner from ".";

describe("IntegrationBanner", () => {
  it("should render without error", () => {
    renderComponent(
      <IntegrationBanner
        integration={{ name: "Qulture Rocks", image: "bla" }}
      />,
    );

    expectTextToBeInTheDocument("IntegrationBanner");
  });
});
