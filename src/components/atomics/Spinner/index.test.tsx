import { renderComponent } from "config/testUtils";
import Spinner from ".";

describe("Spinner", () => {
  it("should render without error", () => {
    renderComponent(<Spinner />);
  });
});
