import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useTokenDecimals from "hooks/useTokenDecimals";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useTranslation } from "react-i18next";
import { useContract } from "hooks/useContract";
import RibonAbi from "utils/abis/RibonAbi.json";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { useCryptoTransaction } from "@ribon.io/shared/hooks";
import {
  formatFromDecimals,
  formatToDecimals,
} from "lib/web3Helpers/etherFormatters";
import { logError } from "services/crashReport";
import { stringToNumber } from "lib/formatters/stringToNumberFormatter";
import { logEvent } from "lib/events";
import { BigNumber, utils } from "ethers";
import { PLATFORM } from "utils/constants";
import { useWalletContext } from "../walletContext";
import { useLoadingOverlay } from "../loadingOverlayContext";
import { useNetworkContext } from "../networkContext";

export type onDonationToContractSuccessProps = (
  hash: string,
  timestamp: number,
  amountDonated: BigNumber,
) => void;

export interface ICryptoPaymentContext {
  handleDonationToContract: (
    causeId: number,
    onSuccess?: onDonationToContractSuccessProps,
  ) => Promise<void>;
  disableButton: () => boolean;
  amount: string;
  setAmount: (amount: string) => void;
  insufficientBalance: () => boolean;
  currentPool?: string;
  setCurrentPool: (pool: string) => void;
  userBalance: string;
  tokenSymbol: string;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CryptoPaymentContext = createContext<ICryptoPaymentContext>(
  {} as ICryptoPaymentContext,
);

function CryptoPaymentProvider({ children }: Props) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState("0");
  const { currentNetwork } = useNetworkContext();
  const { tokenDecimals } = useTokenDecimals();
  const [currentPool, setCurrentPool] = useState(
    currentNetwork?.defaultPoolAddress,
  );
  const [tokenSymbol, setTokenSymbol] = useState("USDC");

  const integrationId = useIntegrationId();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage",
  });

  const contract = useContract({
    address: currentNetwork?.ribonContractAddress,
    ABI: RibonAbi.abi,
    currentNetwork,
  });
  const donationTokenContract = useContract({
    address: currentNetwork?.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
    currentNetwork,
  });

  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const { wallet } = useWalletContext();
  const { createTransaction } = useCryptoTransaction();

  const approveAmount = async () =>
    donationTokenContract?.functions.approve(
      currentNetwork?.ribonContractAddress,
      formatToDecimals(amount, tokenDecimals).toString(),
      {
        from: wallet,
      },
    );

  const donateToContract = async () =>
    contract?.functions.addPoolBalance(
      currentPool,
      formatToDecimals(amount, tokenDecimals).toString(),
      true,
    );

  const fetchUsdcUserBalance = useCallback(async () => {
    try {
      const balance = wallet
        ? await donationTokenContract?.balanceOf(wallet)
        : 0;
      const formattedBalance = formatFromDecimals(balance, tokenDecimals);
      setUserBalance(formattedBalance.toString());
    } catch (error) {
      logError(error);
      setUserBalance("0");
    }
  }, [wallet, tokenDecimals, donationTokenContract]);

  useEffect(() => {
    fetchUsdcUserBalance();
  }, [fetchUsdcUserBalance]);

  const insufficientBalance = () => {
    const amountNumber = stringToNumber(amount);
    const userBalanceNumber = stringToNumber(userBalance);

    return amountNumber > userBalanceNumber;
  };

  const disableButton = () =>
    amount === "0.00" || (wallet && insufficientBalance()) || loading;

  const handleDonationToContract = async (
    causeId: number,
    onSuccess?: onDonationToContractSuccessProps,
  ) => {
    setLoading(true);
    showLoadingOverlay(t("tokenAmountTransferMessage"));
    try {
      const approval = await approveAmount();
      await approval.wait();
      showLoadingOverlay(t("contractTransferMessage"));
      const response = await donateToContract();

      const { hash } = response;
      const timestamp = Math.floor(new Date().getTime() / 1000);

      createTransaction(
        hash,
        amount,
        wallet ?? "",
        integrationId ?? 1,
        causeId ?? 1,
        PLATFORM,
      );

      if (onSuccess) onSuccess(hash, timestamp, utils.parseEther(amount));
    } catch (error) {
      logEvent("toastNotification_view", {
        status: "transactionFailed",
      });
      logError(error);
    } finally {
      setLoading(false);
      hideLoadingOverlay();
    }
  };

  const fetchTokenSymbol = useCallback(async () => {
    try {
      const contractSymbol = await donationTokenContract?.functions.symbol();
      if (contractSymbol) setTokenSymbol(contractSymbol);
    } catch (error) {
      logError(error);
      setTokenSymbol("USDC");
    }
  }, [donationTokenContract]);

  useEffect(() => {
    fetchTokenSymbol();
  }, [fetchTokenSymbol]);

  const cryptoPaymentObject: ICryptoPaymentContext = useMemo(
    () => ({
      handleDonationToContract,
      disableButton,
      amount,
      setAmount,
      insufficientBalance,
      currentPool,
      setCurrentPool,
      userBalance,
      tokenSymbol,
    }),
    [amount, currentPool, userBalance, tokenSymbol],
  );

  return (
    <CryptoPaymentContext.Provider value={cryptoPaymentObject}>
      {children}
    </CryptoPaymentContext.Provider>
  );
}

export default CryptoPaymentProvider;

export const useCryptoPayment = () => {
  const context = useContext(CryptoPaymentContext);

  if (!context) {
    throw new Error(
      "useCryptoPayment must be used within CryptoPaymentProvider",
    );
  }

  return context;
};
