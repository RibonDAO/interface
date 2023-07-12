import { renderComponent } from "config/testUtils/renders";
import { expectPageToNavigateTo } from "config/testUtils/expects";
import { clickOn, waitForPromises } from "config/testUtils";
import ReturnToIntegrationPage from ".";

const mockIntegration = {
  id: "1",
  name: "Test Integration",
  integrationTask: {
    linkAddress: "https://www.test.com",
  },
};
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useIntegration: () => ({
    integration: mockIntegration,
  }),
}));
describe("ReturnToIntegrationPage", () => {
  describe("when the user clicks on the stay button", () => {
    beforeEach(() => {
      renderComponent(<ReturnToIntegrationPage />);
    });

    it("should navigate to the causes page", () => {
      clickOn("Stay in Ribon");
      expectPageToNavigateTo("/causes");
    });
  });

  describe("when the user clicks on the navigate button", () => {
    beforeEach(async () => {
      global.open = jest.fn();
      renderComponent(<ReturnToIntegrationPage />);
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
