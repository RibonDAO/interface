import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import SupportCausePage from ".";

const mockCause = causeFactory();
const mockCause2 = causeFactory({ name: "💊 Health", id: 2 });

jest.mock("hooks/apiHooks/useCauses", () => ({
  __esModule: true,
  default: () => ({
    causes: [mockCause, mockCause2],
    refetch: () => {},
  }),
}));

describe("SupportCausePage", () => {
  beforeEach(async () => {
    renderComponent(<SupportCausePage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Make a direct donation");
  });

  it("logs the nonProfitSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("nonProfitSupportScreen_view");
  });

  describe("when the button option is clicked", () => {
    it("logs the nonProfitCauseSelection_click event", () => {
      clickOn("💊 Health");

      expectLogEventToHaveBeenCalledWith("nonProfitCauseSelection_click", {
        id: 2,
      });
    });
  });
});
