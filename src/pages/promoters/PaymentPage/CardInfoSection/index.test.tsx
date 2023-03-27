import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import { expectDisplayValueToBeInTheDocument } from "config/testUtils/expects";
import PaymentInformation from ".";

describe("CardInfoSection", () => {
  it("should fill payment methods form", () => {
    renderComponent(<PaymentInformation />);

    userEvent.type(screen.getByPlaceholderText("E-mail"), "usertest@ribon.io");
    fireEvent.change(screen.getByPlaceholderText("Card number"), {
      target: { value: "1234 5678 9012 3456" },
    });
    userEvent.type(screen.getByPlaceholderText("Name on card"), "User Test");
    fireEvent.change(screen.getByPlaceholderText("Expiration"), {
      target: { value: "12/2023" },
    });
    userEvent.type(
      screen.getByPlaceholderText("Card verification code"),
      "123",
    );

    expectDisplayValueToBeInTheDocument("usertest@ribon.io");
    expectDisplayValueToBeInTheDocument("1234 5678 9012 3456");
    expectDisplayValueToBeInTheDocument("User Test");
    expectDisplayValueToBeInTheDocument("12/2023");
    expectDisplayValueToBeInTheDocument("123");
  });
});
