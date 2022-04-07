import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
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
import * as S from "./styles";

function SupportFundPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage",
  });
  const [amount, setAmount] = useState("");
  const contract = useContract({
    address: RIBON_CONTRACT_ADDRESS,
    ABI: RibonAbi.abi,
  });
  const donationTokenContract = useContract({
    address: DONATION_TOKEN_CONTRACT_ADDRESS,
    ABI: DonationTokenAbi.abi,
  });
  const { wallet } = useWalletContext();

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

  const approveAmount = async () => {
    await donationTokenContract?.functions.approve(
      RIBON_CONTRACT_ADDRESS,
      utils.parseEther("10000000000"),
      {
        from: wallet,
      },
    );
  };

  useEffect(() => {
    SimpleMaskMoney.setMask("#amount", args);
  }, []);

  const disableButton = () => amount === "0.00";

  const handleFinishButtonClick = async () => {
    try {
      await approveAmount();
      await contract?.functions.addDonationPoolBalance(
        utils.parseEther(amount),
      );
    } catch (error) {
      logError(error);
    }
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>

      <S.Input
        name="amount"
        id="amount"
        type="text"
        placeholder="0.00"
        inputMode="numeric"
      />

      <S.ButtonContainer>
        <S.FinishButton
          text={t("button")}
          onClick={handleFinishButtonClick}
          disabled={disableButton()}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default SupportFundPage;
