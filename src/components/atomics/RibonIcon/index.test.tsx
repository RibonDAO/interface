import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import RibonIcon from ".";

describe("<RibonIcon />", () => {
  it("should render with default color", () => {
    renderComponent(<RibonIcon />);
    expect(screen.getByLabelText(/Ribon Icon/i).parentElement).toHaveStyle(
      "color: #00DA93",
    );
  });

  it("should render with colorBrandTertiary400 color when color is passed ", () => {
    renderComponent(<RibonIcon color="color.brand.tertiary[400]" />);
    expect(screen.getByLabelText(/Ribon Icon/i).parentElement).toHaveStyle(
      "color: color.brand.tertiary[400]",
    );
  });
});
