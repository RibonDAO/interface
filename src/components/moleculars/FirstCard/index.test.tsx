import React from "react"
import { clickOn, renderComponent } from "config/testUtils";
import FirstCard from ".";
import { NonProfit } from "@ribon.io/shared";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

const mockNonProfit = {
  name: "Non Profit Test",
  impactTitle: "Impact title test",
  coverImage: "coverImage.png",
} as NonProfit

const buttonOnClick = jest.fn();

describe("FirstCard Component", () => {
  beforeEach(() => {
    renderComponent(<FirstCard nonProfit={mockNonProfit} buttonOnClick={buttonOnClick} buttonDisabled={false} ticketsQuantity={2}/>)
  })

  it("should render texts without error", () => {
    expectTextToBeInTheDocument("Non Profit Test");
    expectTextToBeInTheDocument("Impact title test");
    expectTextToBeInTheDocument("2");
  })

  it("should call a function when click on button", () => {
    clickOn("Donate tickets");
    expect(buttonOnClick).toBeCalled()
  })
})

