import { fireEvent, screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ConfirmEmail from ".";

const mockOnFormSubmit = jest.fn();
const mockPrimaryButtonOnClick = jest.fn();
const mockSecondaryButtonOnClick = jest.fn();

describe("ConfirmEmail", () => {
  it("renders the component with the correct props", async () => {
    renderComponent(
      <ConfirmEmail
        onFormSubmit={mockOnFormSubmit}
        visible
        title="Confirm Email"
        icon="email"
        primaryButton={{
          text: "Confirm",
          onClick: mockPrimaryButtonOnClick,
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: mockSecondaryButtonOnClick,
        }}
      />,
    );

    expectTextToBeInTheDocument("Confirm");
    expectTextToBeInTheDocument("Cancel");
  });

  it("disables the confirm button when the email field is empty", async () => {
    renderComponent(
      <ConfirmEmail
        onFormSubmit={mockOnFormSubmit}
        visible
        title="Confirm Email"
        icon="email"
        primaryButton={{
          text: "Confirm",
          onClick: mockPrimaryButtonOnClick,
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: mockSecondaryButtonOnClick,
        }}
      />,
    );

    expect(screen.getByText("Confirm")).toBeDisabled();
  });

  it("disables the confirm button when an invalid email is entered", async () => {
    renderComponent(
      <ConfirmEmail
        onFormSubmit={mockOnFormSubmit}
        visible
        title="Confirm Email"
        icon="email"
        primaryButton={{
          text: "Confirm",
          onClick: mockPrimaryButtonOnClick,
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: mockSecondaryButtonOnClick,
        }}
      />,
    );

    const emailInput = screen.getByPlaceholderText("E-mail");
    const confirmButton = screen.getByText("Confirm");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    expect(confirmButton).toBeDisabled();
  });

  it("enables the confirm button when a valid email is entered", async () => {
    renderComponent(
      <ConfirmEmail
        onFormSubmit={mockOnFormSubmit}
        visible
        title="Confirm Email"
        icon="email"
        primaryButton={{
          text: "Confirm",
          onClick: mockPrimaryButtonOnClick,
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: mockSecondaryButtonOnClick,
        }}
      />,
    );

    const emailInput = screen.getByPlaceholderText("E-mail");
    const confirmButton = screen.getByText("Confirm");

    fireEvent.change(emailInput, {
      target: { value: "valid-email@example.com" },
    });

    expect(confirmButton).toBeEnabled();
  });
});
