import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import MadeByRibonPill from ".";

describe("MadeByRibonPill", () => {
  it("renders without error", () => {
    renderComponent(<MadeByRibonPill text="test" />);
    expectTextToBeInTheDocument("test");
  });
});
