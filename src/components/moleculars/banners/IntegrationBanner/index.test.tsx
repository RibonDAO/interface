import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import IntegrationBanner from ".";

describe("IntegrationBanner", () => {
  it("should render without error", () => {
    renderComponent(
      <IntegrationBanner
        integration={{
          id: 1,
          status: "string",
          ticketAvailabilityInMinutes: 10,
          name: "Qulture Rocks",
          logo: "other",
        }}
      />,
    );

    expectTextToBeInTheDocument("IntegrationBanner");
  });
});
