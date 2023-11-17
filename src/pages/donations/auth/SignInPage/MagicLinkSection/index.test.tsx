import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import MagicLinkSection from ".";

const mockNonProfit = nonProfitFactory({ name: "🌳 Environment", id: 1 });

describe("MagicLinkSection", () => {
  it("should render without error", () => {
    renderComponent(<MagicLinkSection nonProfit={mockNonProfit} />);

    expectTextToBeInTheDocument("Continue with e-mail");
  });
});
