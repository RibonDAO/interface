import React from "react";
import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import LoadingOverlay from ".";

describe("LoadingOverlay", () => {
  it("should render without error", () => {
    renderComponent(<LoadingOverlay text="carregando..." visible />);
    expect(screen.getByText("carregando...")).toBeInTheDocument();
  });
});
