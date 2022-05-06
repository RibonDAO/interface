import CardRoundDoubleImage from "components/moleculars/cards/CardRoundDoubleImage";
import CardSideSquareImageButton from "components/moleculars/cards/CardSideSquareImageButton";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logEvent } from "services/analytics";
import theme from "styles/theme";
import NonProfit from "types/entities/NonProfit";
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

  const handleFinishButtonClick = () => {
    navigateTo("/");
  };

  useEffect(() => {
    logEvent("donateFinishedDonation_view", { selected: nonProfit?.id });
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <CardRoundDoubleImage
          leftImage={nonProfit?.backgroundImage}
          rightImage={nonProfit?.logo}
        />
        <S.Title>{t("title")}</S.Title>
        <S.Subtitle>{`${nonProfit?.impactByTicket} ${nonProfit?.impactDescription}`}</S.Subtitle>

        <S.InnerContainer>
          <S.HrDivider color={theme.colors.lightGray} width="100%" />

          <CardSideSquareImageButton
            title={`${t("ngoTitle")} ${nonProfit?.name}`}
            text={nonProfit?.description}
            image={nonProfit?.backgroundImage}
            buttonText={t("moreInfoButtonText")}
            onButtonClick={() => {
              window.open(nonProfit?.link, "_blank");
            }}
          />
        </S.InnerContainer>
      </S.Wrapper>

      <S.ButtonContainer>
        <S.FinishButton
          text={t("button")}
          onClick={() => {
            handleFinishButtonClick();
          }}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default DonationDonePage;
