import { useIntegration } from "@ribon.io/shared";
import { clickOn, renderComponent } from "config/testUtils";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import GiveTicketV2Page from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useIntegration: jest.fn(),
}));

describe("GiveTicketV2Page", () => {
  describe("when the integration is Ribon", () => {
    beforeEach(() => {
      (useIntegration as jest.Mock).mockReturnValue({
        integration: { id: 1, name: "Ribon" },
      });
      renderComponent(<GiveTicketV2Page />);
    });

    it("should renders correct title", () => {
      expectTextToBeInTheDocument("You won 1 ticket!");
    });
  });

  describe("should when the integration is not Ribon", () => {
    beforeEach(() => {
      (useIntegration as jest.Mock).mockReturnValue({
        integration: { id: 2, name: "Spacex" },
      });
      renderComponent(<GiveTicketV2Page />);
    });

    it("should render the correct title", () => {
      expectTextToBeInTheDocument("Spacex gave you 1 ticket!");
    });
  });

  describe("should when there is no integration", () => {
    beforeEach(() => {
      (useIntegration as jest.Mock).mockReturnValue({
        integration: null,
      });
      renderComponent(<GiveTicketV2Page />);
    });
    it("render correct title", () => {
      expectTextToBeInTheDocument("You won 1 ticket!");
    });
  });

  describe("when click buttons in screen", () => {
    beforeEach(() => {
      (useIntegration as jest.Mock).mockReturnValue({
        integration: { id: 1, name: "Ribon" },
      });
      renderComponent(<GiveTicketV2Page />);
    });

    it("should navigates to page second screen onboarding", () => {
      clickOn("Next");
      expectPageToNavigateTo("/onboarding/second-page");
    });
  });
});
