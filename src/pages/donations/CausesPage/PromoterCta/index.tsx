import Banner from "components/moleculars/cards/Banner";
import Background from "assets/images/background-green-shapes.svg";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

function PromoterCta() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.promoterCta",
  });
  return (
    <S.OuterContainer>
      <Banner cardBackground={Background}>
        <S.Container>
          <S.Title>{t("title")}</S.Title>
          <S.TextList>{t("listItem1")}</S.TextList>
          <S.TextList>{t("listItem2")}</S.TextList>
          <S.CtaButton text="Conhecer funcionalidade" />
        </S.Container>
      </Banner>
    </S.OuterContainer>
  );
}

export default PromoterCta;
