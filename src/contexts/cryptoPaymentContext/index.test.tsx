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
const wallet = "0x123";
const currentNetwork = {
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
  beforeEach(async () => {
    renderComponent(<CryptoPaymentTestPage />, {
      walletProviderValue: {
        wallet,
      },
      networkProviderValue: {
        currentNetwork,
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
    const amount = 0;

    it("calls the approve function with correct params", async () => {
      const approveSpy = jest.spyOn(mockContract.functions, "approve");
      clickOn("donate");
      await waitForPromises();

      expect(approveSpy).toHaveBeenCalledWith(
        currentNetwork.ribonContractAddress,
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
        currentNetwork.defaultPoolAddress,
        amount.toString(),
        true,
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

describe("useCryptoPayment without contract", () => {
  beforeAll(() => {
    jest.unmock("hooks/useContract");
  });
  beforeEach(async () => {
    renderComponent(<CryptoPaymentTestPage />);
    await waitForPromises();
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("CryptoPayment");
  });

  it("returns the user balance", () => {
    expectTextToBeInTheDocument("0");
  });

  it("returns the token symbol", () => {
    expectTextToBeInTheDocument("USDC");
  });
});
