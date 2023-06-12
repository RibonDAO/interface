import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import LoadingPage from ".";

describe("LoadingPage", () => {
  it("should render without error", () => {
    renderComponent(<LoadingPage />);

    expectTextToBeInTheDocument("spinner.svg");
  });
});
