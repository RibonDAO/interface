import { renderComponent } from "config/testUtils";
import { NonProfit } from "@ribon.io/shared/types";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardSection from ".";

jest.mock("hooks/usePaymentParams", () => ({
  __esModule: true,
  default: () => ({
    currency: "USDC",
    target: "non_profit",
    targetId: 1,
    offer: 1,
  }),
}));

jest.mock("hooks/usePayable", () => ({
  __esModule: true,
  default: () => ({
    currentPayable: {
      id: 1,
      name: "test",
    } as NonProfit,
  }),
}));

describe("CardSection", () => {
  it("should render without error", () => {
    renderComponent(<CardSection />);

    expectTextToBeInTheDocument("Payment");
  });
});
