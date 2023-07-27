import React from "react";
import { render, screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import { useCauseDonationContext } from ".";

const mockCause = {
  id: 1,
  name: "Animal Cause",
  active: true,
  pools: [],
};

function CauseDonationContextTestPage() {
  const { chosenCause } = useCauseDonationContext();
  return (
    <>
      <div>CauseDonationContext</div>
      <div>{chosenCause?.name}</div>
    </>
  );
}

describe("useCauseDonationContext", () => {
  it("should render without error", () => {
    render(<CauseDonationContextTestPage />);
    expect(screen.getByText("CauseDonationContext")).toBeInTheDocument();
  });

  it("should show the chosen cause", () => {
    renderComponent(<CauseDonationContextTestPage />, {
      causeDonationProviderValue: {
        chosenCause: mockCause,
      },
    });
    expect(screen.getByText(mockCause.name)).toBeInTheDocument();
  });
});
