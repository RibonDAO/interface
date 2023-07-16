import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import { expectDisplayValueToBeInTheDocument } from "config/testUtils/expects";
import CreditCardForm from ".";

describe("CardInfoSection", () => {
  it("should fill the credit form", () => {
    renderComponent(<CreditCardForm />);

    fireEvent.change(screen.getByTestId("number"), {
      target: { value: "1234 5678 9012 3456" },
    });
    userEvent.type(screen.getByTestId("name"), "User Test");
    fireEvent.change(screen.getByTestId("expirationDate"), {
      target: { value: "12/2023" },
    });
    userEvent.type(screen.getByTestId("cvv"), "123");

    expectDisplayValueToBeInTheDocument("1234 5678 9012 3456");
    expectDisplayValueToBeInTheDocument("User Test");
    expectDisplayValueToBeInTheDocument("12/2023");
    expectDisplayValueToBeInTheDocument("123");
  });
});
