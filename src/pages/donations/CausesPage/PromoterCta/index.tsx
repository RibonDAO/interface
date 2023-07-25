import Banner from "components/moleculars/cards/Banner";
import Background from "assets/images/background-green-shapes.svg";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import { theme } from "@ribon.io/shared/styles";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

function PromoterCta() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.promoterCta",
  });
  const { navigateTo } = useNavigation();

  const handleButtonClick = () => {
    logEvent("giveCauseCard_click", {
      from: "promoterBannerCta",
    });

    navigateTo("/promoters/support-cause-control-flow");
  };

  return (
    <S.OuterContainer>
      <Banner
        cardBackground={Background}
        backgroundColor={theme.colors.brand.primary[900]}
      >
        <S.Container>
          <S.LabelContainer>
            <S.Label>{t("label")}</S.Label>
          </S.LabelContainer>
          <S.Title>{t("title")}</S.Title>
          <S.TextList>
            <S.Text>{t("listItem1")}</S.Text>
          </S.TextList>
          <S.TextList>
            <S.Text>{t("listItem2")}</S.Text>
          </S.TextList>
          <S.CtaButton text={t("ctaButtonText")} onClick={handleButtonClick} />
        </S.Container>
      </Banner>
    </S.OuterContainer>
  );
}

export default PromoterCta;
