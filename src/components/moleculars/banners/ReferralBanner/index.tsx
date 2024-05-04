import { useTranslation } from "react-i18next";
// import { logEvent } from "lib/events";
import Letter from "./assets/letter.svg";
import * as S from "./styles";

export default function ReferralBanner() {
  const { t } = useTranslation("translation", {
    keyPrefix: "referralBanner",
  });

  return (
    <S.Container>
      <S.TextContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Text>{t("subtitle")}</S.Text>
        <S.CtaButton onClick={() => {}} text={t("cta")} />
      </S.TextContainer>
      <S.ImageContainer>
        <S.Image src={Letter} alt="Ribon Referral Program" />
      </S.ImageContainer>
    </S.Container>
  );
}
