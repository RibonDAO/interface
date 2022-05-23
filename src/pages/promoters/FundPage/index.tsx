import { useTranslation } from "react-i18next";
import CardBlank from "components/moleculars/cards/CardBlank";
import Button from "components/atomics/Button";
import { useEffect } from "react";
import {
  DONATION_TOKEN_CONTRACT_ADDRESS,
  RIBON_CONTRACT_ADDRESS,
} from "utils/contractUtils";
import useNavigation from "hooks/useNavigation";
import { useContract } from "hooks/useContract";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import RibonAbi from "utils/abis/RibonAbi.json";
import { logEvent } from "services/analytics";
import useContractBalance from "hooks/apiHooks/useContractBalance";
import * as S from "./styles";
import GivingsSection from "./GivingsSection";
import ModalOnboarding from "./ModalOnboarding";

function FundPage(): JSX.Element {
  const coin = "USDC";
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.fundPage",
  });
  const donationTokenContract = useContract({
    address: DONATION_TOKEN_CONTRACT_ADDRESS,
    ABI: DonationTokenAbi.abi,
  });
  const contract = useContract({
    address: RIBON_CONTRACT_ADDRESS,
    ABI: RibonAbi.abi,
  });

  const { contractBalance, refetch: fetchContractBalance } = useContractBalance(
    donationTokenContract,
    RIBON_CONTRACT_ADDRESS,
  );

  const handleSupportButtonClick = () => {
    logEvent("fundSupportBtn_click", {
      from: "fundBalance",
    });
    navigateTo("/promoters/support-fund");
  };

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
      <ModalOnboarding />
      <S.Title>{t("title")}</S.Title>
      <S.SectionTitle>{t("treasureBalance")}</S.SectionTitle>
      <S.CardContainer>
        <CardBlank>
          <S.FundText>
            {contractBalance} <S.FundTextCoin>{coin}</S.FundTextCoin>
          </S.FundText>
          <Button
            text={t("treasureSupportButtonText")}
            onClick={handleSupportButtonClick}
          />
        </CardBlank>
      </S.CardContainer>
      <S.CarouselContainer>
        <GivingsSection />
      </S.CarouselContainer>
    </S.Container>
  );
}

export default FundPage;
