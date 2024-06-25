import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GiveTicketPage from ".";

const mockIntegration = {
  id: 3,
  name: "Test Integration",
  logo: "logo",
  integrationTask: {
    id: 1,
    description: "Test description",
    link: "Test link",
    linkAddress: "https://www.test.com",
  },
  status: "active",
  ticketAvailabilityInMinutes: 1,
};

describe("GiveTicketPage", () => {
  describe("when the integration is Ribon", () => {
    beforeEach(() => {
      renderComponent(<GiveTicketPage />, {
        integrationProviderValue: {
          currentIntegrationId: 1,
        },
      });
    });

    it("should renders correct title", () => {
      expectTextToBeInTheDocument("You won 1 ticket!");
    });
  });

  describe("should when the integration is not Ribon", () => {
    beforeEach(() => {
      renderComponent(<GiveTicketPage />, {
        integrationProviderValue: {
          currentIntegrationId: 3,
          integration: mockIntegration,
        },
      });
    });

    it("should render the correct title", () => {
      expectTextToBeInTheDocument(`${mockIntegration.name} gave you 1 ticket!`);
    });
  });

  describe("should when there is no integration", () => {
    beforeEach(() => {
      renderComponent(<GiveTicketPage />);
    });
    it("render correct title", () => {
      expectTextToBeInTheDocument("You won 1 ticket!");
    });
  });

  describe("render button to download app", () => {
    beforeEach(() => {
      Object.assign(global, { innerWidth: 500 });
      renderComponent(<GiveTicketPage />, {
        integrationProviderValue: {
          currentIntegrationId: 1,
        },
      });
    });

    it("should render button to download app and stay in browser", () => {
      expectTextToBeInTheDocument("Go to app");
      expectTextToBeInTheDocument("Stay in browser");
    });
  });
});
