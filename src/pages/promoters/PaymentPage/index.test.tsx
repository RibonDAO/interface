import { clickOn, fillByPlaceholder, renderComponent } from "config/testUtils";
import {
  expectPageToNavigateBack,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import offerFactory from "config/testUtils/factories/offerFactory";
import causeFactory from "config/testUtils/factories/causeFactory";
import { fireEvent, screen } from "@testing-library/react";
import PaymentPage from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCardGivingFees: () => ({
    cardGivingFees: { netGiving: 5, serviceFees: 5 },
    refetch: jest.fn(),
  }),
}));

describe("PaymentPage", () => {
  const offer = offerFactory();
  const cause = causeFactory();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    renderComponent(<PaymentPage />, {
      locationState: {
        offer,
        cause,
        flow: "cause",
      },
      cardPaymentProviderValue: {
        country: "Brazil",
        handleSubmit: mockHandleSubmit,
      },
    });
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument(offer.price);
    expectTextToBeInTheDocument(cause.name);
  });

  describe("when the page is in user section", () => {
    describe("back button", () => {
      it("navigates back", () => {
        clickOn(screen.getByAltText("back-arrow-button"));

        expectPageToNavigateBack();
      });
    });

    describe("continue button", () => {
      describe("when the form is not filled", () => {
        it("stays on disabled state", () => {
          expect(screen.getByText("Continue")).toBeDisabled();
        });
      });

      describe("when the form is filled", () => {
        beforeEach(() => {
          fillByPlaceholder("Country", "Brazil");
          fillByPlaceholder("City", "Brasilia");
          fillByPlaceholder("State", "DF");
          fireEvent.change(screen.getByPlaceholderText("Tax ID"), {
            target: { value: "000.000.000-00" },
          });
        });

        it("goes to enabled mode", () => {
          expect(screen.getByText("Continue")).toBeEnabled();
        });

        it("goes to card section when clicked", () => {
          clickOn("Continue");

          expect(
            screen.getByPlaceholderText("Card number"),
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("when the page is in card section", () => {
    beforeEach(() => {
      fillByPlaceholder("Country", "Brazil");
      fillByPlaceholder("City", "Brasilia");
      fillByPlaceholder("State", "DF");
      fireEvent.change(screen.getByPlaceholderText("Tax ID"), {
        target: { value: "000.000.000-00" },
      });

      clickOn("Continue");
    });

    describe("back button", () => {
      it("sets the page to user state", () => {
        clickOn(screen.getByAltText("back-arrow-button"));

        expect(screen.getByPlaceholderText("Country")).toBeInTheDocument();
      });
    });

    describe("continue button", () => {
      describe("when the form is not filled", () => {
        it("stays on disabled state", () => {
          expect(screen.getByText("Continue")).toBeDisabled();
        });
      });

      describe("when the form is filled", () => {
        beforeEach(() => {
          fireEvent.change(screen.getByPlaceholderText("Card number"), {
            target: { value: "4111 1111 1111 111" },
          });
          fireEvent.change(screen.getByPlaceholderText("Expiration"), {
            target: { value: "12/2023" },
          });
          fillByPlaceholder("Name on card", "JOHN DOE");
          fillByPlaceholder("E-mail", "john@doe.com");
          fillByPlaceholder("Card verification code", "412");
        });

        it("calls the handle submit function when clicked", () => {
          clickOn("Continue");

          expect(mockHandleSubmit).toHaveBeenCalled();
        });
      });
    });
  });
});
