import React from "react";
import { renderComponent } from "config/testUtils";
import { mockRequest } from "config/testUtils/test-helper";
import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import causeFactory from "config/testUtils/factories/causeFactory";
import Causes from ".";
import ConfirmSection from ".";

describe("ConfirmSection", () => {
  it("renders without error", () => {
    const nonProfit = nonProfitFactory();
    const integration = {} as any;
    const mockDonateTicket = jest.fn();
    renderComponent(
      <ConfirmSection
        chosenNonProfit={nonProfit}
        integration={integration}
        donateTicket={mockDonateTicket}
        confirmModalVisible
        donationInProcessModalVisible={false}
        setConfirmModalVisible={() => {}}
        setDonationInProcessModalVisible={() => {}}
        closeConfirmModal={() => {}}
      />,
    );

    expectTextToBeInTheDocument(
      "Enter your e-mail to use your donation ticket",
    );
  });
});
