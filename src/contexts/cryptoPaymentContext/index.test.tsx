import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useCryptoPayment } from ".";

const mockApprove = () => ({ wait: () => {} });
const mockAddPoolBalance = () => ({ hash: "0x000" });
const mockContract = {
  functions: {
    addPoolBalance: mockAddPoolBalance,
    approve: mockApprove,
    symbol: () => "USDC",
  },
  addPoolBalance: jest.fn(),
  approve: jest.fn(),
  balanceOf: () => 100 * 10 ** 18,
  decimals: () => 18,
};

jest.mock("hooks/useContract", () => ({
  __esModule: true,
  useContract: () => mockContract,
}));

jest.mock("hooks/useTokenDecimals", () => ({
  __esModule: true,
  default: () => ({
    tokenDecimals: 18,
  }),
}));

function CryptoPaymentTestPage() {
  const { userBalance, handleDonationToContract, tokenSymbol } =
    useCryptoPayment();
  return (
    <div>
      CryptoPayment
      <button type="button" onClick={() => handleDonationToContract()}>
        donate
      </button>
      <p>{userBalance}</p>
      <p>{tokenSymbol}</p>
    </div>
  );
}

describe("useCryptoPayment", () => {
  const wallet = "0x123";

  beforeEach(async () => {
    renderComponent(<CryptoPaymentTestPage />, {
      walletProviderValue: {
        wallet,
      },
    });
    await waitForPromises();
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("CryptoPayment");
  });

  it("returns the user balance", () => {
    expectTextToBeInTheDocument("100");
  });

  it("returns the token symbol", () => {
    expectTextToBeInTheDocument("USDC");
  });

  describe("#handleDonateToContract", () => {
    const RIBON_CONTRACT_ADDRESS = "0x411DF13350D6aB065Fc2d1Fd026b6d7f4133e9Df";
    const DEFAULT_POOL_ADDRESS = "0x841cad54aaeAdFc9191fb14EB09232af8E20be0F";
    const amount = 0;

    it("calls the approve function with correct params", async () => {
      const approveSpy = jest.spyOn(mockContract.functions, "approve");
      clickOn("donate");
      await waitForPromises();

      expect(approveSpy).toHaveBeenCalledWith(
        RIBON_CONTRACT_ADDRESS,
        amount.toString(),
        {
          from: wallet,
        },
      );
      approveSpy.mockRestore();
    });

    it("calls the donateToContract function with correct params", async () => {
      const addPoolBalanceSpy = jest.spyOn(
        mockContract.functions,
        "addPoolBalance",
      );
      clickOn("donate");
      await waitForPromises();

      expect(addPoolBalanceSpy).toHaveBeenCalledWith(
        DEFAULT_POOL_ADDRESS,
        amount.toString(),
      );
      addPoolBalanceSpy.mockRestore();
    });
  });
});
