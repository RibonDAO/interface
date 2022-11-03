import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import {
  expectDisplayValueToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import UserInfoSection from ".";

describe("UserInfoSection", () => {
  it("should render without error", () => {
    renderComponent(<UserInfoSection />);

    expectTextToBeInTheDocument("Billing Information");
  });

  it("should fill billing information form", () => {
    renderComponent(<UserInfoSection />, {
      cardPaymentProviderValue: {
        country: "Brazil",
      },
    });

    userEvent.type(screen.getByPlaceholderText("Country"), "Brazil");
    userEvent.type(screen.getByPlaceholderText("City"), "São Paulo");
    userEvent.type(screen.getByPlaceholderText("State"), "SP");
    userEvent.type(screen.getByPlaceholderText("Tax ID"), "00000000000");

    expectDisplayValueToBeInTheDocument("Brazil");
    expectDisplayValueToBeInTheDocument("São Paulo");
    expectDisplayValueToBeInTheDocument("SP");
    expectDisplayValueToBeInTheDocument("000.000.000-00");
  });
});
