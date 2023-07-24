import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import SupportCausePage from ".";

const mockCause = causeFactory();
const mockCause2 = causeFactory({ name: "💊 Health", id: 2 });

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCauses: () => ({
    causes: [mockCause, mockCause2],
    refetch: jest.fn(),
  }),
}));

describe("SupportCausePage", () => {
  beforeEach(async () => {
    renderComponent(<SupportCausePage />, {
      causesProviderValue: { activeCauses: [mockCause, mockCause2] },
    });
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Donate with a community");
  });

  it("logs the causeSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("causeSupportScreen_view");
  });

  describe("when the button option is clicked", () => {
    it("logs the supportCauseSelection_click event", () => {
      clickOn("💊 Health");

      expectLogEventToHaveBeenCalledWith("supportCauseSelection_click", {
        id: 2,
      });
    });
  });

  describe("community add section", () => {
    it("renders the community add section", () => {
      expectTextToBeInTheDocument("The Community will add");
    });
  });
});
