import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SupportCausePage from ".";

describe("SupportCausePage", () => {
  it("should render without error", () => {
    renderComponent(<SupportCausePage />);

    expectTextToBeInTheDocument("SupportCausePage");
  });
});
