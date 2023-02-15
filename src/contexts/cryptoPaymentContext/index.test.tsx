import { causeFactory } from "@ribon.io/shared";
import {
  clickOn,
  fillByPlaceholder,
  renderComponent,
  waitForPromises,
} from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useCryptoPayment } from ".";

const mockApprove = () => ({ wait: () => {} });
const mockTransactionHash = "0x000";
const mockAddPoolBalance = () => ({ hash: mockTransactionHash });
const mockOnSuccess = jest.fn();
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

const cause = causeFactory();

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

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCryptoTransaction: () => ({
    createTransaction: jest.fn(),
    refetch: jest.fn(),
  }),
}));

function CryptoPaymentTestPage() {
  const {
    userBalance,
    handleDonationToContract,
    tokenSymbol,
    amount,
    setAmount,
  } = useCryptoPayment();
  return (
    <div>
      CryptoPayment
      <button
        type="button"
        onClick={() => handleDonationToContract(cause.id, mockOnSuccess)}
      >
        donate
      </button>
      <input
        type="text"
        name="amount-input"
        placeholder="amount"
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value);
        }}
      />
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
    const RIBON_CONTRACT_ADDRESS = "0x4Ef236DA69ac23a9246cd1d8866264f1A95601C0";
    const DEFAULT_POOL_ADDRESS = "0x1E7aF4A35E33E8CfA97e12237509623a8037632C";
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

    it("calls the onSuccess function", async () => {
      fillByPlaceholder("amount", "10");
      clickOn("donate");
      await waitForPromises();

      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
