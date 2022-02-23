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
          rightImage={nonProfit?.mainImage}
        />
        <S.Title>{t("title")}</S.Title>
        <S.Subtitle>{t("subtitle")}</S.Subtitle>

        <S.HrDivider color={theme.colors.lightGray} width="100%" />

        <CardSideSquareImageButton
          title={t("ngoTitle")}
          text={t("ngoInformation")}
          image={nonProfit?.backgroundImage}
          buttonText="More info"
          onButtonClick={() => {}}
        />
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
