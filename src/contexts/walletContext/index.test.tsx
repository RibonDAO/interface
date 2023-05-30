import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "config/testUtils/renders";
import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
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
const mockToast = jest.fn();

jest.mock("hooks/useToast", () => ({
  __esModule: true,
  default: () => mockToast,
}));

const permittedNetworks = [
  {
    id: 1,
    name: "Mumbai Testnet",
    ribonContractAddress: "0xF02a09B21267EDB53B459ddC802C60245dEfbE34",
    donationTokenContractAddress: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
    chainId: 0x13881,
    rpcUrls: "https://rpc-mumbai.maticvigil.com",
    nodeUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
    symbolName: "MATIC",
    currencyName: "Matic",
    blockExplorerUrls: "https://mumbai.polygonscan.com/",
    defaultPoolAddress: "0x9B00b1a3C4ea8BFbBE984360513f7bE7e971e431",
  },
];

function WalletTestPage() {
  const { wallet, connectWallet } = useWalletContext();

  return (
    <div>
      <span data-testid="wallet">{wallet}</span>
      <button type="button" onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  );
}

describe("useWallet", () => {
  it("should render without error", () => {
    render(<WalletTestPage />);
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
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

describe("changeNetwork", () => {
  beforeEach(async () => {
    window.ethereum = {
      request: () => {
        const error = new Error() as any;
        error.code = 4001;
        throw error;
      },
      networkVersion: "1",
      on: jest.fn(),
    };
    renderComponent(<WalletTestPage />, {
      networkProviderValue: {
        permittedNetworks,
      },
    });
    await waitForPromises();
  });
  it("should call toast if invalid network", async () => {
    clickOn("Connect Wallet");
    await waitForPromises();
    expect(mockToast).toHaveBeenCalled();
  });
});
