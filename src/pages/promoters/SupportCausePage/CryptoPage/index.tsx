import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useWalletContext } from "contexts/walletContext";
import * as S from "../styles";
import UserSupportSection from "../../SupportTreasurePage/CardSection/UserSupportSection";
import SupportImage from "../assets/support-image.png";
import SelectCryptoOfferSection from "./SelectCryptoOfferSection";

function SupportCausePage(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { navigateTo } = useNavigation();
  const { cause, setCause } = useCardPaymentInformation();
  const [cryptoValue, setCryptoValue] = useState(0);
  const { connectWallet, wallet } = useWalletContext();

  const { causes } = useCauses();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    logEvent("treasureSupportScreen_view");
  }, []);

  useEffect(() => {
    setCause(causes[0]);
  }, [JSON.stringify(causes)]);

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    logEvent("treasureCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
    setSelectedButtonIndex(index);
  };

  function renderCausesButtons() {
    return causes?.map((item, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={() => handleCauseClick(item, index)}
        key={item?.id}
      >
        <S.ButtonText>{item.name}</S.ButtonText>
      </S.Button>
    ));
  }

  const handleDonateClick = () => {
    if (wallet) {
      console.log(wallet, cryptoValue);
      return;
    }

    connectWallet();
    logEvent("treasureComCicleBtn_click");
  };

  const handleCommunityAddClick = () => {
    navigateTo({
      pathname: "/promoters/community-add",
      state: {
        donationAmount: `${cryptoValue} USDC`,
      },
    });
  };

  const communityAddText = () => {
    const PERCENTAGE_OF_INCREASE = 0.6;

    return `+ ${cryptoValue * PERCENTAGE_OF_INCREASE} USDC`;
  };

  const donateButtonText = () => {
    if (wallet) return t("donateButtonText", { value: `${cryptoValue} USDC` });

    return t("connectWalletButtonText");
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.CausesContainer>{renderCausesButtons()}</S.CausesContainer>
      <S.ContentContainer>
        <S.SupportImage src={SupportImage} />
        <S.DonateContainer>
          <S.GivingContainer>
            <S.ContributionContainer>
              <SelectCryptoOfferSection
                cause={cause}
                onValueChange={(value: number) => setCryptoValue(value)}
              />
            </S.ContributionContainer>
            <S.CommunityAddContainer>
              <S.CommunityAddText>{t("communityAddText")}</S.CommunityAddText>
              <S.CommunityAddValue>{communityAddText()}</S.CommunityAddValue>
              <S.CommunityAddButton
                text={t("communityAddButtonText")}
                onClick={handleCommunityAddClick}
                outline
              />
            </S.CommunityAddContainer>
          </S.GivingContainer>
          <S.DonateButton
            text={donateButtonText()}
            onClick={handleDonateClick}
          />
        </S.DonateContainer>
        <UserSupportSection />
      </S.ContentContainer>

      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default SupportCausePage;
