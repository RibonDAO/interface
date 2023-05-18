import React from "react";
import { render, screen } from "@testing-library/react";
import { useWalletContext } from ".";

jest.mock("hooks/useNetworkContext", () => ({
  useNetworkContext: () => ({
    permittedNetworks: [
      {
        name: "Mumbai Testnet",
        chainId: 0x13881,
        ensAddress: "https://rpc-mumbai.maticvigil.com",
      },
    ],
    isLoading: false,
  }),
}));

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
