import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import SimpleMaskMoney from "simple-mask-money";
import { useContract } from "hooks/useContract";
import {
  DONATION_TOKEN_CONTRACT_ADDRESS,
  RIBON_CONTRACT_ADDRESS,
} from "utils/contractUtils";
import RibonAbi from "utils/abis/RibonAbi.json";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { useWalletContext } from "contexts/walletContext";
import { utils } from "ethers";
import { logError } from "services/crashReport";
import UsdcIcon from "assets/icons/usdc-icon.svg";
import useToast from "hooks/useToast";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";
import { stringToNumber } from "lib/formatters/stringToNumberFormatter";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import * as S from "./styles";

function SupportFundPage(): JSX.Element {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState("");

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage",
  });
  const contract = useContract({
    address: RIBON_CONTRACT_ADDRESS,
    ABI: RibonAbi.abi,
  });
  const donationTokenContract = useContract({
    address: DONATION_TOKEN_CONTRACT_ADDRESS,
    ABI: DonationTokenAbi.abi,
  });
  const { wallet } = useWalletContext();
  const toast = useToast();
  const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

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

  const approveAmount = async () =>
    donationTokenContract?.functions.approve(
      RIBON_CONTRACT_ADDRESS,
      utils.parseEther(amount),
      {
        from: wallet,
      },
    );

  const donateToContract = async () =>
    contract?.functions.addDonationPoolBalance(utils.parseEther(amount));

  const fetchUsdcUserBalance = useCallback(async () => {
    try {
      const balance = await donationTokenContract?.balanceOf(wallet);
      const formattedBalance = formatFromWei(balance);

      setUserBalance(formattedBalance);
    } catch (error) {
      logError(error);
    }
  }, [wallet]);

  useEffect(() => {
    fetchUsdcUserBalance();
  }, [fetchUsdcUserBalance]);

  useEffect(() => {
    SimpleMaskMoney.setMask("#amount", args);
  }, []);

  useEffect(() => {
    logEvent("fundSupportScreen_view");
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
    logEvent("fundSupportConfirmBtn_click");
    setLoading(true);
    showLoadingOverlay(t("tokenAmountTransferMessage"));
    try {
      const approval = await approveAmount();
      await approval.wait();
      showLoadingOverlay(t("contractTransferMessage"));
      const response = await donateToContract();

      const id = response.hash;
      const timestamp = Math.floor(new Date().getTime() / 1000);

      toast({
        message: t("transactionOnBlockchainText"),
        type: "success",
        link: `https://mumbai.polygonscan.com/tx/${id}`,
      });
      logEvent("toastNotification_view", {
        status: "transactionProcessed",
      });
      navigateTo({
        pathname: "/promoters/fund",
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

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
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
    </S.Container>
  );
}

export default SupportFundPage;
