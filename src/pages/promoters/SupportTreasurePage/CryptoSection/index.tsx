import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import SimpleMaskMoney from "simple-mask-money";
import { useContract } from "hooks/useContract";
import { useNetworkContext } from "contexts/networkContext";
import RibonAbi from "utils/abis/RibonAbi.json";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { useWalletContext } from "contexts/walletContext";
import { utils } from "ethers";
import { logError } from "services/crashReport";
import UsdcIcon from "assets/icons/usdc-icon.svg";
import useToast from "hooks/useToast";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import { stringToNumber } from "lib/formatters/stringToNumberFormatter";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import useCryptoTransaction from "hooks/apiHooks/useCryptoTransaction";
import {
  formatFromDecimals,
  formatToDecimals,
} from "lib/web3Helpers/etherFormatters";
import WalletIcon from "./assets/wallet-icon.svg";
import * as S from "./styles";

function CryptoSection(): JSX.Element {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState("");
  const { currentNetwork } = useNetworkContext();
  const [tokenDecimals, setTokenDecimals] = useState(6);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage",
  });
  const contract = useContract({
    address: currentNetwork.ribonContractAddress,
    ABI: RibonAbi.abi,
  });
  const donationTokenContract = useContract({
    address: currentNetwork.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
  });
  const toast = useToast();
  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const { wallet, connectWallet } = useWalletContext();
  const { createTransaction } = useCryptoTransaction();

  const args = {
    afterFormat(e: string) {
      setAmount(e);
    },
    allowNegative: false,
    negativeSignAfter: false,
    prefix: "",
    suffix: "",
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ".",
    thousandsSeparator: ",",
    cursor: "end",
  };

  useEffect(() => {
    async function fetchDecimals() {
      const decimals = await donationTokenContract?.decimals();
      setTokenDecimals(decimals);
    }

    fetchDecimals();
  }, [donationTokenContract]);

  const approveAmount = async () =>
    donationTokenContract?.functions.approve(
      currentNetwork.ribonContractAddress,
      formatToDecimals(amount, tokenDecimals).toString(),
      {
        from: wallet,
      },
    );

  const donateToContract = async () =>
    contract?.functions.addPoolBalance(
      currentNetwork.defaultPoolAddress, // TODO get pool address dynamically
      formatToDecimals(amount, tokenDecimals).toString(),
    );

  const fetchUsdcUserBalance = useCallback(async () => {
    try {
      const balance = await donationTokenContract?.balanceOf(wallet);
      const formattedBalance = formatFromDecimals(balance, tokenDecimals);

      setUserBalance(formattedBalance.toString());
    } catch (error) {
      logError(error);
    }
  }, [wallet, tokenDecimals]);

  useEffect(() => {
    fetchUsdcUserBalance();
  }, [fetchUsdcUserBalance]);

  useEffect(() => {
    if (wallet) {
      SimpleMaskMoney.setMask("#amount", args);
    }
  }, []);

  const insufficientBalance = () => {
    const amountNumber = stringToNumber(amount);
    const userBalanceNumber = stringToNumber(userBalance);

    return amountNumber > userBalanceNumber;
  };

  const disableButton = () =>
    amount === "0.00" || insufficientBalance() || loading;

  const finishButtonText = () => {
    if (loading) return "...";
    if (insufficientBalance()) return t("insufficientBalanceText");
    if (disableButton()) return t("disabledButtonText");

    return t("buttonText");
  };

  const handleFinishButtonClick = async () => {
    logEvent("treasureSupportConfirmBtn_click");
    setLoading(true);
    showLoadingOverlay(t("tokenAmountTransferMessage"));
    try {
      const approval = await approveAmount();
      await approval.wait();
      showLoadingOverlay(t("contractTransferMessage"));
      const response = await donateToContract();

      const id = response.hash;
      const timestamp = Math.floor(new Date().getTime() / 1000);

      createTransaction(id, amount, wallet ?? "");

      toast({
        message: t("transactionOnBlockchainText"),
        type: "success",
        link: `${currentNetwork.blockExplorerUrls}tx/${id}`,
        linkMessage: t("linkMessageToast"),
      });
      logEvent("toastNotification_view", {
        status: "transactionProcessed",
      });

      navigateTo({
        pathname: "/promoters/treasure",
        state: {
          id,
          timestamp,
          amountDonated: utils.parseEther(amount),
          processing: true,
        },
      });
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

  const handleConnectWalletButtonClick = () => {
    logEvent("treasureConWalletBtn_click", {
      from: "supportPageButton",
    });
    connectWallet();
  };

  function renderConnectWallet() {
    logEvent("treasureSupportWalletRequest_view");
    return (
      <S.ConnectContainer>
        <S.Image src={WalletIcon} alt="walletIcon" />
        <S.Label>{t("connectWallet")}</S.Label>
        <S.ConnectButton
          text={t("connectWalletButton")}
          onClick={handleConnectWalletButtonClick}
        />
      </S.ConnectContainer>
    );
  }

  function renderFormCryptocurrency() {
    return (
      <div>
        <S.Subtitle>{t("subtitle")}</S.Subtitle>

        <S.InputContainer>
          <S.Input
            name="amount"
            id="amount"
            type="text"
            placeholder="0.00"
            inputMode="numeric"
          />
          <S.UsdcContainer>
            <S.UsdcIcon src={UsdcIcon} />
            <S.UsdcText>USDC</S.UsdcText>
          </S.UsdcContainer>
        </S.InputContainer>
        <S.Text>{t("usdcBalanceText", { balance: userBalance })}</S.Text>

        <S.ButtonContainer>
          <S.FinishButton
            text={finishButtonText()}
            onClick={handleFinishButtonClick}
            disabled={disableButton()}
          />
        </S.ButtonContainer>
      </div>
    );
  }

  return (
    <div>{wallet ? renderFormCryptocurrency() : renderConnectWallet()}</div>
  );
}

export default CryptoSection;
