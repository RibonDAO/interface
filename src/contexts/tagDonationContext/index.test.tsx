import React from "react";
import { render, screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import { useTagDonationContext } from ".";

const mockTag = {
  id: 1,
  name: "Animal Tag",
  status: "active",
  non_profits: [],
};

function TagDonationContextTestPage() {
  const { chosenTag } = useTagDonationContext();
  return (
    <>
      <div>TagDonationContext</div>
      <div>{chosenTag?.name}</div>
    </>
  );
}

describe("useTagDonationContext", () => {
  it("should render without error", () => {
    render(<TagDonationContextTestPage />);
    expect(screen.getByText("TagDonationContext")).toBeInTheDocument();
  });

  it("should show the chosen cause", () => {
    renderComponent(<TagDonationContextTestPage />, {
      tagDonationProviderValue: {
        chosenTag: mockTag,
      },
    });
    expect(screen.getByText(mockTag.name)).toBeInTheDocument();
  });
});
