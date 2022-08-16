import CardRoundDoubleImage from "components/moleculars/cards/CardRoundDoubleImage";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "services/analytics";
import NonProfit from "types/entities/NonProfit";
import heartsBackground from "assets/animations/hearts-background.json";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};

function DonationDonePage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDonePage",
  });
  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("donateFinishedDonation_view", {
      selected: nonProfit?.id,
    });
    setTimeout(() => {
      navigateTo("/");
    }, 5000);
  }, []);

  return (
    <S.Container>
      <S.HeartAnimation
        animationData={heartsBackground}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          opacity: 0.2,
          position: "absolute",
        }}
      />
      <S.Wrapper>
        <CardRoundDoubleImage
          leftImage={nonProfit?.mainImage}
          rightImage={nonProfit?.logo}
        />
        <S.Title>{t("title")}</S.Title>
        <S.Subtitle>{`${t("youDonatedText")} ${nonProfit?.impactByTicket} ${
          nonProfit?.impactDescription
        }`}</S.Subtitle>
      </S.Wrapper>
    </S.Container>
  );
}

export default DonationDonePage;
