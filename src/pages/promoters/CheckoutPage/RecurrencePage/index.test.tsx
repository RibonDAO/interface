import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import offerFactory from "config/testUtils/factories/offerFactory";
import { clickOn, renderComponent } from "config/testUtils";
import RecurrencePage from ".";

jest.mock("hooks/usePaymentParams", () => ({
  __esModule: true,
  default: () => ({
    currency: "USD",
    target: "non_profit",
    targetId: "1",
    offer: "0",
    paymentMethodIndex: "0",
    language: "en-US",
  }),
}));

const mockCurrentPayable = nonProfitFactory();
jest.mock("hooks/usePayable", () => ({
  __esModule: true,
  default: () => mockCurrentPayable,
}));

const mockOfferSubscription = offerFactory();
const mockOffer = offerFactory({
  subscription: false,
  priceCents: 500,
});

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useOffers: () => ({
    offers: [mockOffer, mockOfferSubscription],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

describe("FiatSection", () => {
  it("should render without error", () => {
    renderComponent(<RecurrencePage />);

    expectTextToBeInTheDocument("Recurrence");
  });

  describe("currence section", () => {
    it("when is a subscription", () => {
      renderComponent(<RecurrencePage />);

      clickOn("Contribute once");

      expectPageToNavigateTo("/promoters/checkout", {
        search:
          "integration_id=1&offer=500&target=non_profit&target_id=1&currency=USD&subscription=false",
      });
    });

    it("when is not a subscription", () => {
      renderComponent(<RecurrencePage />);

      clickOn("Contribute monthly");

      expectPageToNavigateTo("/promoters/checkout", {
        search:
          "integration_id=1&offer=500&target=non_profit&target_id=1&currency=USD&subscription=true",
      });
    });
  });
});
