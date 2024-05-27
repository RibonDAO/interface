import { useIntegration } from "@ribon.io/shared";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GiveTicketPage from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useIntegration: jest.fn(),
}));

describe("GiveTicketPage", () => {
  describe("when the integration is Ribon", () => {
    beforeEach(() => {
      (useIntegration as jest.Mock).mockReturnValue({
        integration: { id: 1, name: "Ribon" },
      });
      renderComponent(<GiveTicketPage />);
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
      renderComponent(<GiveTicketPage />);
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
      renderComponent(<GiveTicketPage />);
    });
    it("render correct title", () => {
      expectTextToBeInTheDocument("You won 1 ticket!");
    });
  });

  describe("render button to download app", () => {
    beforeEach(() => {
      Object.assign(global, { innerWidth: 500 });
      (useIntegration as jest.Mock).mockReturnValue({
        integration: { id: 1, name: "Ribon" },
      });
      renderComponent(<GiveTicketPage />);
    });

    it("should render button to See how it works and Skip", () => {
      expectTextToBeInTheDocument("See how it works");
      expectTextToBeInTheDocument("Skip");
    });
  });
});
