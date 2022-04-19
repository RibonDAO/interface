import { useTranslation } from "react-i18next";
import CardBlank from "components/moleculars/cards/CardBlank";
import Button from "components/atomics/Button";
import { useEffect, useState } from "react";
import {
  DONATION_TOKEN_CONTRACT_ADDRESS,
  RIBON_CONTRACT_ADDRESS,
} from "utils/contractUtils";
import { useWalletContext } from "contexts/walletContext";
import useNavigation from "hooks/useNavigation";
import { useContract } from "hooks/useContract";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import RibonAbi from "utils/abis/RibonAbi.json";
import { logError } from "services/crashReport";
import { logEvent } from "services/analytics";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";
import * as S from "./styles";

function FundPage(): JSX.Element {
  const [donationPoolBalance, setDonationPoolBalance] = useState<string | null>(
    null,
  );
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.fundPage",
  });
  const { wallet, connectWallet } = useWalletContext();
  const donationTokenContract = useContract({
    address: DONATION_TOKEN_CONTRACT_ADDRESS,
    ABI: DonationTokenAbi.abi,
  });
  const contract = useContract({
    address: RIBON_CONTRACT_ADDRESS,
    ABI: RibonAbi.abi,
  });

  async function fetchContractBalance() {
    try {
      const balance = await donationTokenContract?.balanceOf(
        RIBON_CONTRACT_ADDRESS,
      );
      const formattedBalance = formatFromWei(balance);

      setDonationPoolBalance(formattedBalance);
    } catch (e) {
      logError(e);
    }
  }

  const handleSupportButtonClick = () => {
    logEvent("fundConWalletBtn_click", {
      from: "supportButton",
    });
    if (wallet) {
      logEvent("fundSupportBtn_click", {
        from: "fundBalance",
      });
      navigateTo("/promoters/support-fund");
      return;
    }

    connectWallet();
  };

  useEffect(() => {
    fetchContractBalance();
  }, []);

  useEffect(() => {
    logEvent("fundScreen_view");
  }, []);

  useEffect(() => {
    contract?.on("PoolBalanceIncreased", () => {
      fetchContractBalance();
    });
  }, []);

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>

      <S.SectionTitle>{t("fundBalance")}</S.SectionTitle>
      <S.CardContainer>
        <CardBlank>
          <S.FundText>
            {donationPoolBalance} <S.FundTextCoin>USDC</S.FundTextCoin>
          </S.FundText>
          <Button
            text={t("fundSupportButtonText")}
            onClick={handleSupportButtonClick}
          />
        </CardBlank>
      </S.CardContainer>
    </S.Container>
  );
}

export default FundPage;
