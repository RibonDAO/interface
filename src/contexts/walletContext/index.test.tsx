import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "config/testUtils/renders";
import { waitForPromises } from "config/testUtils";
import {
  checkConnectionRequest,
  connectWalletRequest,
} from "lib/walletConnector";
import { useWalletContext } from ".";

jest.mock("lib/walletConnector", () => ({
  __esModule: true,
  connectWalletRequest: jest.fn(),
  checkConnectionRequest: jest.fn(),
}));

const mockConnectWalletRequest = connectWalletRequest as jest.Mock;
const mockCheckConnectionRequest = checkConnectionRequest as jest.Mock;

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

describe("connectWallet", () => {
  let current: ReturnType<typeof useWalletContext>;

  beforeEach(async () => {
    mockConnectWalletRequest.mockResolvedValue("123");
    mockCheckConnectionRequest.mockResolvedValue("123");
    const { hook } = renderHook(() => useWalletContext());
    await waitForPromises();
    current = hook.result.current;
  });

  it("should call connectWalletRequest", async () => {
    const { connectWallet } = current;
    connectWallet();
    await waitForPromises();
    expect(connectWalletRequest).toHaveBeenCalled();
  });

  it("should update wallet", async () => {
    const { connectWallet, wallet } = current;

    connectWallet();
    await waitForPromises();
    expect(wallet).toBe("123");
  });

  it("should call checkConnectionRequest through checkIfWalletIsConnected", async () => {
    render(<WalletTestPage />);
    await waitForPromises();
    expect(checkConnectionRequest).toHaveBeenCalled();
  });
});
