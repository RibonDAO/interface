import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import { expectDisplayValueToBeInTheDocument } from "config/testUtils/expects";
import PaymentInformation from ".";

describe("CardInfoSection", () => {
  it("should fill payment methods form", () => {
    renderComponent(<PaymentInformation />);

    userEvent.type(screen.getByPlaceholderText("E-mail"), "usertest@ribon.io");
    userEvent.type(
      screen.getByPlaceholderText("Card number"),
      "1234567890123456",
    );
    userEvent.type(screen.getByPlaceholderText("Name on card"), "User Test");
    userEvent.type(screen.getByPlaceholderText("Expiration"), "1220");
    userEvent.type(
      screen.getByPlaceholderText("Card verification code"),
      "123",
    );

    expectDisplayValueToBeInTheDocument("usertest@ribon.io");
    expectDisplayValueToBeInTheDocument("1234 5678 9012 3456");
    expectDisplayValueToBeInTheDocument("User Test");
    expectDisplayValueToBeInTheDocument("12/20");
    expectDisplayValueToBeInTheDocument("123");
  });
});
