import React from "react";
import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardSideSquareImageButton from ".";

describe("CardSideSquareImageButton", () => {
  it("should render without error", () => {
    renderComponent(
      <CardSideSquareImageButton
        text="CardSideSquareImageButton"
        title="titile"
        image=""
        buttonText=""
        onButtonClick={() => {}}
      />,
    );

    expectTextToBeInTheDocument("CardSideSquareImageButton");
  });
});
