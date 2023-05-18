import { useTranslation } from "react-i18next";
import CardBlank from "components/moleculars/cards/CardBlank";
import Button from "components/atomics/buttons/Button";
import { useEffect } from "react";
import { useNetworkContext } from "contexts/networkContext";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { COMES_FROM_TREASURE } from "lib/localStorage/constants";
import { useContract } from "hooks/useContract";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import RibonAbi from "utils/abis/RibonAbi.json";
import { logEvent } from "lib/events";
import useContractBalance from "hooks/apiHooks/useContractBalance";
import { setLocalStorageItem } from "lib/localStorage";
import * as S from "./styles";
import GivingsSection from "./GivingsSection";
import ModalOnboarding from "./ModalOnboarding";

type LocationStateType = {
  from?: string;
};

function TreasurePage(): JSX.Element {
  const coin = "USDC";
  const { navigateTo } = useNavigation();
  const { currentNetwork } = useNetworkContext();
  const {
    state: { from },
  } = useLocation<LocationStateType>();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.treasurePage",
  });
  const donationTokenContract = useContract({
    address: currentNetwork?.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
  });
  const contract = useContract({
    address: currentNetwork?.ribonContractAddress,
    ABI: RibonAbi.abi,
  });

  const {
    contractBalance,
    isLoading: isLoadingBalance,
    refetch: fetchContractBalance,
  } = useContractBalance(
    donationTokenContract,
    currentNetwork?.defaultPoolAddress,
  );

  const handleSupportButtonClick = () => {
    logEvent("treasureSupportBtn_click", {
      from: "treasureBalance",
    });
    navigateTo("/promoters/support-treasure");
  };

  useEffect(() => {
    logEvent("treasureScreen_view");
  }, []);

  useEffect(() => {
    if (from?.includes("/donation-done")) {
      setLocalStorageItem(COMES_FROM_TREASURE, "true");
    }
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
          <S.TreasureText>
            {isLoadingBalance ? "..." : contractBalance.toFixed(2)}{" "}
            <S.TreasureTextCoin>{coin}</S.TreasureTextCoin>
          </S.TreasureText>
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

export default TreasurePage;
