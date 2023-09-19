import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import TrustSeal from ".";

describe("TrustSeal", () => {
  it("should render without error", () => {
    renderComponent(<TrustSeal />);

    expectTextToBeInTheDocument("Safe transaction by");
    expectTextToBeInTheDocument("verified_user");
  });
});
