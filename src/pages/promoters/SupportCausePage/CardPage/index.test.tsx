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
    renderComponent(<SupportCausePage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Donate with a community");
  });

  it("logs the treasureSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("treasureSupportScreen_view");
  });

  describe("when the button option is clicked", () => {
    it("logs the treasureCauseSelection_click event", () => {
      clickOn("💊 Health");

      expectLogEventToHaveBeenCalledWith("treasureCauseSelection_click", {
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
