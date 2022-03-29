import { expectTextToBeInTheDocument, renderComponent } from "config/testUtils";
import FundPage from ".";

describe("FundPage", () => {
  it("should render without error", () => {
    renderComponent(<FundPage />);

    expectTextToBeInTheDocument("Fund");
  });
});
