import React from "react";
import { render, screen } from "@testing-library/react";
import { useCauseContributionContext } from ".";

function CausesContextTestPage() {
  useCauseContributionContext();
  return <div>CausesContext</div>;
}

describe("useCauseContributionContext", () => {
  it("should render without error", () => {
    render(<CausesContextTestPage />);
    expect(screen.getByText("CausesContext")).toBeInTheDocument();
  });
});
