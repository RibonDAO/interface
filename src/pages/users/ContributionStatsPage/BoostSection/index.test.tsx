import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import BoostSection from ".";

describe("BoostSection", () => {
  it("renders without error", () => {
    renderComponent(<BoostSection totalAmountToCause="R$ 100,00" />);

    expectTextToBeInTheDocument("R$ 100,00");
  });
});
