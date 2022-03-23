import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import CardCenterImageButton from ".";

describe("CardCenterImageButton", () => {
  it("should render without error", () => {
    renderComponent(
      <CardCenterImageButton
        image=""
        title="Recursos de saúde básica para famílias"
        buttonText=""
        onClickButton={() => {}}
        softDisabled={false}
      />,
    );
    expect(
      screen.getByText("Recursos de saúde básica para famílias"),
    ).toBeInTheDocument();
  });
});
