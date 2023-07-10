import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Data from ".";

describe("Data", () => {
  it("should render without error", () => {
    renderComponent(<Data data="80,000" label="Data" color="white" />);

    expectTextToBeInTheDocument("Data");
  });
});
