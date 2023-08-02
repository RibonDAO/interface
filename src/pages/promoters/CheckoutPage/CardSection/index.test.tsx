import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import offerFactory from "config/testUtils/factories/offerFactory";
import { renderComponent } from "config/testUtils";
import CardSection from ".";

jest.mock("hooks/usePaymentParams", () => ({
  __esModule: true,
  default: () => ({
    currency: "USD",
    target: "non_profit",
    targetId: "1",
    offer: "0",
  }),
}));

const mockCurrentPayable = nonProfitFactory();
jest.mock("hooks/usePayable", () => ({
  __esModule: true,
  default: () => mockCurrentPayable,
}));

const mockOffer = offerFactory();
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useOffers: () => ({
    offers: [mockOffer],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

describe("CardSection", () => {
  it("should render without error", () => {
    renderComponent(<CardSection />);

    expectTextToBeInTheDocument("Confirm payment");
  });
});
