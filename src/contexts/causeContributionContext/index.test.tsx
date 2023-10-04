import React from "react";
import { render, screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import { useCauseContributionContext } from ".";

const mockCause = {
  id: 1,
  name: "Animal Cause",
  status: "active",
  pools: [],
};

function CauseContributionContextTestPage() {
  const { chosenCause } = useCauseContributionContext();
  return (
    <>
      <div>CauseContributionContext</div>
      <div>{chosenCause?.name}</div>
    </>
  );
}

describe("useCauseContributionContext", () => {
  it("should render without error", () => {
    render(<CauseContributionContextTestPage />);
    expect(screen.getByText("CauseContributionContext")).toBeInTheDocument();
  });

  it("should show the chosen cause", () => {
    renderComponent(<CauseContributionContextTestPage />, {
      causeContributionProviderValue: {
        chosenCause: mockCause,
      },
    });
    expect(screen.getByText(mockCause.name)).toBeInTheDocument();
  });
});
