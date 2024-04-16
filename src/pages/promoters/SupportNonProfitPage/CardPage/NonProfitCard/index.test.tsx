import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import NonProfitCard from ".";

const mockNonProfit = nonProfitFactory();

describe("NonProfitCard", () => {
  beforeEach(() => {
    renderComponent(<NonProfitCard nonProfit={mockNonProfit} />);
  });

  it("show show the nonProfit name", () => {
    expectTextToBeInTheDocument(mockNonProfit.name);
  });
});
