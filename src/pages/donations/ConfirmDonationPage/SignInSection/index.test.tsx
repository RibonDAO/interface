import { nonProfitFactory } from "@ribon.io/shared/config";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn, fillByPlaceholder } from "config/testUtils";
import { screen } from "@testing-library/react";
import SignInSection from ".";

describe("SignInSection", () => {
  const nonProfit = nonProfitFactory();
  const onContinue = jest.fn();

  beforeEach(() => {
    renderComponent(
      <SignInSection nonProfit={nonProfit} onContinue={onContinue} />,
    );
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Enter your e-mail to donate");
  });

  it("enables the continue button when email is filled", () => {
    fillByPlaceholder("E-mail", "test@ribon.io");

    expect(screen.getByText("Continue")).toBeEnabled();
  });

  it("disables the continue button when email is invalid", () => {
    fillByPlaceholder("E-mail", "invalid");

    expect(screen.getByText("Continue")).toBeDisabled();
  });

  it("calls the on continue function when continue button is pressed", () => {
    fillByPlaceholder("E-mail", "test@ribon.io");
    clickOn("Continue");

    expect(onContinue).toHaveBeenCalledWith("test@ribon.io");
  });
});
