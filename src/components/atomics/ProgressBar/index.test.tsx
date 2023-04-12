import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ProgressBar from ".";

describe("ProgressBar", () => {
  it("should render without errors", () => {
    renderComponent(<ProgressBar value={1} min={0} max={4} />);
    expectTextToBeInTheDocument("1/4");
  });
});
