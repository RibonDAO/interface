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
      ribonContractAddress: "0x348eA4886c5F0926d7A6Ad6C5CF6dFA4F88CA9Bf",
      donationTokenContractAddress:
        "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
      chainId: 0x13881,
      rpcUrls: "https://rpc-mumbai.maticvigil.com",
      nodeUrl:
        "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
      symbolName: "MATIC",
      currencyName: "Matic",
      blockExplorerUrls: "https://mumbai.polygonscan.com/",
      defaultPoolAddress: "0xDE5dD6864A8aE4e5D93E24e24Fee9D42320753B6",
      subgraphUrl:
        "https://api.thegraph.com/subgraphs/name/ribondao/ribonsubgraph",
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
