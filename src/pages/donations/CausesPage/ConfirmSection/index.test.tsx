import { fireEvent, screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import ConfirmSection from ".";

const props = {
  chosenNonProfit: nonProfitFactory({
    impactDescription: "1 hour of study",
  }),
  integration: {
    id: 1,
    name: "name",
    walletAddress: "Ox123",
    url: "https://www.google.com",
    logo: "https://www.google.com",
    integrationTask: {
      id: 1,
      description: "description",
      link: "https://www.google.com",
      linkAddress: "https://www.google.com",
    },
  },
  donateTicket: jest.fn(),
  confirmModalVisible: true,
  donationInProcessModalVisible: false,
  setConfirmModalVisible: jest.fn(),
  setDonationInProcessModalVisible: jest.fn(),
  closeConfirmModal: jest.fn(),
};

test("renders ConfirmEmail component when user is not signed in", () => {
  renderComponent(<ConfirmSection {...props} />);

  expectTextToBeInTheDocument("Confirm your email");
});

test("renders ConfirmDonationModal component when user is signed in", () => {
  renderComponent(<ConfirmSection {...props} />);
  expectTextToBeInTheDocument("Confirm your donation");
});

test("calls donateTicket function when form is submitted", () => {
  const donateTicket = jest.fn();

  renderComponent(<ConfirmSection {...props} />);
  const emailInput = screen.getByTestId("confirm-email-input");
  const submitButton = screen.getByTestId("confirm-email-submit");
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.click(submitButton);
  expect(donateTicket).toHaveBeenCalledWith("test@example.com");
});
