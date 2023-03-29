import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "config/testUtils";
import {
  expectDisplayValueToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import BillingInformationSection from ".";

describe("BillingInformationSection", () => {
  it("should render without error", () => {
    renderComponent(<BillingInformationSection />);

    expectTextToBeInTheDocument("Billing Information");
  });

  it("should fill billing information form", () => {
    renderComponent(<BillingInformationSection />, {
      cardPaymentProviderValue: {
        country: "Brazil",
      },
    });

    userEvent.type(screen.getByPlaceholderText("Country"), "Brazil");
    userEvent.type(screen.getByPlaceholderText("City"), "São Paulo");
    userEvent.type(screen.getByPlaceholderText("State"), "SP");
    fireEvent.change(screen.getByPlaceholderText("Tax ID"), {
      target: { value: "000.000.000-00" },
    });

    expectDisplayValueToBeInTheDocument("Brazil");
    expectDisplayValueToBeInTheDocument("São Paulo");
    expectDisplayValueToBeInTheDocument("SP");
    expectDisplayValueToBeInTheDocument("000.000.000-00");
  });
});
