import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NonProfit from "types/entities/NonProfit";
import useNavigation from "hooks/useNavigation";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
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
    navigateTo({
      pathname: "/promoters/support-cause",
    });
  };

  const handleDonateDirectlyClick = () => {
    navigateTo({
      pathname: "/promoters/support-non-profit",
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
            image={nonProfit.cause?.mainImage}
            onClick={handleDonateWithCommunityClick}
          >
            <S.DarkOverlay />
            <S.Text>{t("donateAsCommunity")}</S.Text>
            <S.CardMainText>{nonProfit.cause.name}</S.CardMainText>
          </S.Card>
          <S.Card
            image={nonProfit.mainImage}
            onClick={handleDonateDirectlyClick}
          >
            <S.DarkOverlay />
            <S.Text>{t("donateDirectly")}</S.Text>
            <S.CardMainText>{nonProfit.name}</S.CardMainText>
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
