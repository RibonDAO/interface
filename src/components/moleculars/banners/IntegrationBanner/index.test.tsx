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

    expectTextToBeInTheDocument(
      "Here at Ribon you donate tickets gotten from Qulture Rocks",
    );
    expectTextToBeInTheDocument("Ribon + Qulture Rocks");
  });

  it("should render without error and custom fields", () => {
    renderComponent(
      <IntegrationBanner
        integration={{
          id: 1,
          status: "string",
          ticketAvailabilityInMinutes: 10,
          name: "Qulture Rocks",
          logo: "other",
          bannerTitle: "Custom title",
          bannerDescription: "Custom description",
        }}
      />,
    );

    expectTextToBeInTheDocument("Custom title");
    expectTextToBeInTheDocument("Custom description");
  });
});
