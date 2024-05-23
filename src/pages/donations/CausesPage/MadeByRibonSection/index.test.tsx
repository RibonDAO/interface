import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import MadeByRibonSection from ".";

describe("MadeByRibonPill", () => {
  it("renders without error", () => {
    renderComponent(<MadeByRibonSection />);
    expectTextToBeInTheDocument("Made by");
  });
});
