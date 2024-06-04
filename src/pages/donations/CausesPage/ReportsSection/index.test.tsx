import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ReportsSection from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useReports: () => ({
    isLoading: false,
    reports: [],
  }),
}));

describe("ReportsSection", () => {
  beforeEach(() => {
    renderComponent(<ReportsSection />);
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Check out the transfer reports");
  });

  it("renders the description", () => {
    expectTextToBeInTheDocument(
      "Monthly, Ribon transfers the total value of donated tickets to the nonprofits.",
    );
  });
});
