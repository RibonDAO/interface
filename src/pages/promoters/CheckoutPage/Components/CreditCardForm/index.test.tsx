import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import {
  expectDisplayValueToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CreditCardForm from ".";

describe("CardInfoSection", () => {
  it("should fill the credit form", () => {
    renderComponent(<CreditCardForm onSubmit={() => {}} showFiscalFields />);

    userEvent.type(screen.getByTestId("email"), "mail@ribon.io");
    userEvent.type(screen.getByTestId("taxId"), "12345678901");

    userEvent.type(screen.getByTestId("number"), "1234 5678 9012 3456");
    userEvent.type(screen.getByTestId("name"), "User Test");
    fireEvent.change(screen.getByTestId("expirationDate"), {
      target: { value: "12/2023" },
    });
    userEvent.type(screen.getByTestId("cvv"), "123");

    expectDisplayValueToBeInTheDocument("mail@ribon.io");
    expectDisplayValueToBeInTheDocument("Brazil");
    expectDisplayValueToBeInTheDocument("1234 5678 9012 3456");
    expectDisplayValueToBeInTheDocument("User Test");
    expectDisplayValueToBeInTheDocument("12/2023");
    expectDisplayValueToBeInTheDocument("123");

    expectTextToBeInTheDocument("Confirm payment");
  });
});
