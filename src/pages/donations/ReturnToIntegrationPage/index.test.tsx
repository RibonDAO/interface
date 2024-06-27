import { expectPageToNavigateTo } from "config/testUtils/expects";
import { clickOn, waitForPromises, renderComponent } from "config/testUtils";
import ReturnToIntegrationPage from ".";

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

describe("ReturnToIntegrationPage", () => {
  describe("when the user clicks on the stay button", () => {
    beforeEach(() => {
      renderComponent(<ReturnToIntegrationPage />);
    });

    it("should navigate to the causes page", () => {
      clickOn("Stay in Ribon");
      expectPageToNavigateTo("/impact");
    });
  });

  describe("when the user clicks on the navigate button", () => {
    beforeEach(async () => {
      global.open = jest.fn();
      renderComponent(<ReturnToIntegrationPage />, {
        integrationProviderValue: {
          currentIntegrationId: 3,
          integration: mockIntegration,
        },
      });
      await waitForPromises();
    });

    it("should navigate to the causes page", () => {
      clickOn("Return to Test Integration");
      expect(global.open).toHaveBeenCalledWith(
        mockIntegration.integrationTask.linkAddress,
      );
    });
  });
});
