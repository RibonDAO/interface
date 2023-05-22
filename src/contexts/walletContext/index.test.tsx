import React from "react";
import { render, screen } from "@testing-library/react";
import { useWalletContext } from ".";

function WalletTestPage() {
  useWalletContext();
  return <div>Wallet</div>;
}

describe("useWallet", () => {
  it("should render without error", () => {
    render(<WalletTestPage />);
    expect(screen.getByText("Wallet")).toBeInTheDocument();
  });
});
