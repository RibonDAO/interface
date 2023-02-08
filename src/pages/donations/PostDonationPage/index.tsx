import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NonProfit from "types/entities/NonProfit";
import useNavigation from "hooks/useNavigation";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import Rocket from "assets/icons/rocket.svg";
import { newLogEvent } from "lib/events";
import * as S from "./styles";

type LocationStateType = {
  nonProfit: NonProfit;
};

function PostDonationPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationPage",
  });

  const {
    state: { nonProfit },
  } = useLocation<LocationStateType>();

  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (nonProfit === undefined) {
      navigateTo({
        pathname: "/",
      });
    }
  }, []);

  const handleDonateWithCommunityClick = () => {
    newLogEvent("click", "P8_causeCard", { causeId: nonProfit.cause.id });
    navigateTo({
      pathname: "/promoters/support-cause",
      state: {
        causeDonated: nonProfit.cause,
      },
    });
  };

  const handleDonateDirectlyClick = () => {
    newLogEvent("click", "P8_nonProfitCard", { nonProfitId: nonProfit.id });
    navigateTo({
      pathname: "/promoters/support-non-profit",
      state: {
        causeDonated: nonProfit.cause,
      },
    });
  };

  const handleDonateLaterClick = () => {
    navigateTo({
      pathname: "/",
    });
  };

  return (
    <S.Container>
      <S.SquaredIcon>
        <S.InnerIcon src={VolunteerActivismGreen} />
      </S.SquaredIcon>
      <S.Title>{t("title")}</S.Title>
      {nonProfit && (
        <>
          <S.Card
            image={nonProfit.cause?.coverImage}
            onClick={handleDonateWithCommunityClick}
          >
            <S.DarkOverlay />
            <S.BoostedDonation>
              <S.Rocket src={Rocket} />
              {t("boostedDonation")}
            </S.BoostedDonation>
            <S.BottomContainer>
              <S.Text>{t("donateAsCommunity")}</S.Text>
              <S.CardMainText>{nonProfit.cause.name}</S.CardMainText>
            </S.BottomContainer>
          </S.Card>
          <S.Card
            image={nonProfit.mainImage}
            onClick={handleDonateDirectlyClick}
          >
            <S.DarkOverlay />
            <S.BottomContainer>
              <S.Text>{t("donateDirectly")}</S.Text>
              <S.CardMainText>{nonProfit.name}</S.CardMainText>
            </S.BottomContainer>
          </S.Card>
        </>
      )}
      <S.ButtonContainer>
        <S.OutlineButton
          onClick={handleDonateLaterClick}
          text={t("donateLater")}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default PostDonationPage;
