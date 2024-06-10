import React from "react";
import { clickOn, renderComponent } from "config/testUtils";
import { NonProfit } from "@ribon.io/shared";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import FirstCard from ".";

const mockNonProfit = {
  name: "Non Profit Test",
  impactTitle: "Impact title test",
  coverImage: "coverImage.png",
} as NonProfit;

const buttonOnClick = jest.fn();

describe("FirstCard Component", () => {
  beforeEach(() => {
    renderComponent(
      <FirstCard
        nonProfit={mockNonProfit}
        buttonOnClick={buttonOnClick}
        buttonText="Donate tickets"
        buttonDisabled={false}
        ticketsQuantity={2}
      />,
    );
  });

  it("should render texts without error", () => {
    expectTextToBeInTheDocument("Non Profit Test");
    expectTextToBeInTheDocument("Impact title test");
    expectTextToBeInTheDocument("2");
    expectTextToBeInTheDocument("Donate tickets");
  });

  it("should call a function when click on button", () => {
    clickOn("Donate tickets");
    expect(buttonOnClick).toHaveBeenCalled();
  });
});
