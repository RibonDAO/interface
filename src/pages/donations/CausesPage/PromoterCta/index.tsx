import Banner from "components/moleculars/cards/Banner";
import Background from "assets/images/background-green-shapes.svg";
import { useTranslation } from "react-i18next";
import { newLogEvent } from "lib/events";
import * as S from "./styles";

function PromoterCta() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.promoterCta",
  });

  const handleButtonClick = () => {
    newLogEvent("click", "promoterCta");
  };

  return (
    <S.OuterContainer>
      <Banner cardBackground={Background}>
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
          <S.CtaButton
            text="Conhecer funcionalidade"
            onClick={handleButtonClick}
          />
        </S.Container>
      </Banner>
    </S.OuterContainer>
  );
}

export default PromoterCta;
