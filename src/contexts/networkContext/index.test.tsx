import { renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderHook } from "config/testUtils/renders";
import { useNetworkContext } from ".";

jest.mock("hooks/useProvider", () => ({
  useProvider: () => ({
    getNetwork: () => ({
      name: "Mumbai Testnet",
      chainId: 0x13881,
      ensAddress: "https://rpc-mumbai.maticvigil.com",
    }),
  }),
}));

const mockChain = {
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
};

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useChains: () => ({
    chains: [mockChain],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

function NetworkTestPage() {
  useNetworkContext();
  return <div>Network</div>;
}

describe("useNetwork", () => {
  let current: ReturnType<typeof useNetworkContext>;
  it("renders without error", async () => {
    renderComponent(<NetworkTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Network");
  });

  describe("getCurrentNetwork", () => {
    beforeEach(async () => {
      const { hook } = renderHook(() => useNetworkContext());
      await waitForPromises();
      current = hook.result.current;
    });

    it("renders the modal when show is called", async () => {
      const { currentNetwork } = current;

      expect(currentNetwork).toEqual(mockChain);
    });
  });
});
