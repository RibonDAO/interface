import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { nonProfitFactory } from "@ribon.io/shared/config";
import { screen } from "@testing-library/react";
import offerFactory from "config/testUtils/factories/offerFactory";
import { clickOn, waitForPromises, renderComponent } from "config/testUtils";
import PixSection from ".";

jest.mock("hooks/usePaymentParams", () => ({
  __esModule: true,
  default: () => ({
    currency: "USD",
    target: "non_profit",
    targetId: "1",
    offer: "0",
    paymentMethodIndex: "0",
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

describe("PixSection", () => {
  const stripeMock = {
    confirmPixPayment: jest.fn(),
  } as any;
  const mockSubmitFn = jest.fn();

  beforeEach(async () => {
    renderComponent(<PixSection currentOffer={mockOffer} />, {
      stripeProviderValue: {
        stripe: stripeMock,
      },
      paymentProviderValue: {
        country: "Brazil",
        name: "John Doe",
        city: "Brasilia",
        state: "DF",
        taxId: "123.456.789-10",
        email: "john@doe.com",
      },
      pixPaymentProviderValue: {
        handleSubmit: mockSubmitFn,
      },
    });
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Generate QR Code");
  });

  describe("when the form is filled", () => {
    it("enables the submit button", () => {
      expect(screen.getByText("Generate QR Code")).toBeEnabled();
    });

    describe("when the submit button is clicked", () => {
      beforeEach(() => {
        clickOn("Generate QR Code");
      });

      it("calls the handle submit function", () => {
        expect(mockSubmitFn).toHaveBeenCalled();
      });

      it("logs the confirmPaymentFormBtn_click", () => {
        expectLogEventToHaveBeenCalledWith("confirmPaymentFormBtn_click", {
          target: "non_profit",
          targetId: "1",
          amount: 10,
          currency: "usd",
          paymentMethod: "pix",
        });
      });
    });
  });
});
