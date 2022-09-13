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
    const payload = {
      chainName: "Mumbai Testnet",
      ribonContractAddress: "0xD3850333819fBdd43784498F67010E5c87a2EAb3",
      donationTokenContractAddress:
        "0x21A72dc641c8e5f13717a7e087d6D63B4f9A3574",
      chainId: 0x13881,
      rpcUrls: "https://rpc-mumbai.maticvigil.com",
      nodeUrl:
        "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
      symbolName: "MATIC",
      currencyName: "Matic",
      blockExplorerUrls: "https://mumbai.polygonscan.com/",
      defaultPoolAddress: "0xD3850333819fBdd43784498F67010E5c87a2EAb3",
    };

    beforeEach(async () => {
      const { hook } = renderHook(() => useNetworkContext());
      await waitForPromises();
      current = hook.result.current;
    });

    it("renders the modal when show is called", async () => {
      await current.getCurrentNetwork();
      const { currentNetwork } = current;

      expect(currentNetwork).toEqual(payload);
    });
  });
});
