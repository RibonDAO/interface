import { TransactionStatus } from "types/enums/TransactionStatus";
import cryptoTransactionApi from ".";
import api from "..";

describe("cryptoTransacrionApi", () => {
  describe("#postTransacrion", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      cryptoTransactionApi.postTransaction("0xAAAA", '5.00', '0xBBBB');

      expect(api.post).toHaveBeenCalledWith("/api/v1/payments/cryptocurrency", {
        transactionHash: "0xAAAA",
        amount: '5.00',
        walletAddress: '0xBBBB'
      });
    });
  });

  describe("#putTransacrion", () => {
    beforeEach(() => {
      api.put = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      cryptoTransactionApi.putTransactionStatus("0xAAAA", TransactionStatus.SUCCESS);

      expect(api.put).toHaveBeenCalledWith("/api/v1/payments/cryptocurrency", {
        transactionHash: "0xAAAA",
        status: TransactionStatus.SUCCESS
      });
    });
  });
});

