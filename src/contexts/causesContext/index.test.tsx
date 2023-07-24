import React from "react";
import { render, screen } from "@testing-library/react";
import { useCausesContext } from ".";

function CausesContextTestPage() {
  useCausesContext();
  return <div>CausesContext</div>;
}

describe("useCausesContext", () => {
  it("should render without error", () => {
    render(<CausesContextTestPage />);
    expect(screen.getByText("CausesContext")).toBeInTheDocument();
  });
});
