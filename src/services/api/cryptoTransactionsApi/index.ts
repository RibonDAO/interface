import { AxiosResponse } from "axios";
import { TransactionStatus } from "types/enums/TransactionStatus";
import { apiPost, apiPut } from "..";

const cryptoTransactionApi = {
  postTransaction: (
    transactionHash: string,
    amount: string,
    walletAddress: string,
  ): Promise<AxiosResponse<any>> =>
    apiPost("payments/cryptocurrency", {
      transactionHash,
      amount,
      walletAddress,
    }),

  putTransactionStatus: (
    transactionHash: string,
    status: TransactionStatus,
  ): Promise<AxiosResponse<any>> =>
    apiPut("payments/cryptocurrency", { transactionHash, status }),
};

export default cryptoTransactionApi;
