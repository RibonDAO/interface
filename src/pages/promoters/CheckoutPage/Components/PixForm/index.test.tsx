import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import {
  expectDisplayValueToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import PixForm from ".";

describe("CardInfoSection", () => {
  it("should fill the credit form", () => {
    renderComponent(<PixForm onSubmit={() => {}} showFiscalFields />);

    userEvent.type(screen.getByTestId("email"), "mail@ribon.io");
    userEvent.type(screen.getByTestId("taxId"), "12345678901");
    userEvent.type(screen.getByTestId("name"), "User Test");

    expectDisplayValueToBeInTheDocument("mail@ribon.io");
    expectDisplayValueToBeInTheDocument("Brazil");
    expectDisplayValueToBeInTheDocument("User Test");

    expectTextToBeInTheDocument("Generate QR Code");
  });
});
