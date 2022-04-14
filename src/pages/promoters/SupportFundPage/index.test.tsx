import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import FundPage from ".";

describe("FundPage", () => {
  it("should render without error", () => {
    renderComponent(<FundPage />);

    expectTextToBeInTheDocument("Support the Fund");
  });

  it("logs the fundSupportScreen_view event", () => {
    renderComponent(<FundPage />);

    expectLogEventToHaveBeenCalledWith("fundSupportScreen_view");
  });
});
