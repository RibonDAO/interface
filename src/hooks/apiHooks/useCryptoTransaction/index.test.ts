import { renderHook } from "@testing-library/react-hooks";
import cryptoTransactionApi from "services/api/cryptoTransactionsApi";
import { TransactionStatus } from "types/enums/TransactionStatus";
import useCryptoTransaction from ".";

describe("useCryptoTransaction", () => {
  let hook: ReturnType<typeof useCryptoTransaction>;

  const testHash = "0xAAAA";
  const testAmount = '5.00';
  const testWallet = '0xBBBB';

  const transactionData = [ testHash, testAmount, testWallet ];

  beforeEach(() => {
    const { result } = renderHook(() => useCryptoTransaction());
    hook = result.current;
  });
  
  describe("#createTransaction", () => {
    beforeEach(() => {
      cryptoTransactionApi.postTransaction = jest.fn(() => ({ transactionData } as any));
    });

    it("calls postTransaction with correct params", () => {
      hook.createTransaction(testHash, testAmount, testWallet);

      expect(cryptoTransactionApi.postTransaction).toHaveBeenCalledWith(...transactionData);
    });
  });

  describe("#updateTransactionStatus", () => {
    beforeEach(() => {
      cryptoTransactionApi.putTransactionStatus = jest.fn(() => ({ transactionData } as any));
    });

    it("calls putTransactionStatus with correct params", () => {
      hook.updateTransactionStatus(testHash, TransactionStatus.SUCCESS);

      expect(cryptoTransactionApi.putTransactionStatus).toHaveBeenCalledWith(testHash, TransactionStatus.SUCCESS);
    });
  });
});
