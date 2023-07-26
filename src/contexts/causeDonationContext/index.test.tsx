import React from "react";
import { render, screen } from "@testing-library/react";
import { useCauseDonationContext } from ".";

function CausesContextTestPage() {
  useCauseDonationContext();
  return <div>CausesContext</div>;
}

describe("useCauseDonationContext", () => {
  it("should render without error", () => {
    render(<CausesContextTestPage />);
    expect(screen.getByText("CausesContext")).toBeInTheDocument();
  });
});
