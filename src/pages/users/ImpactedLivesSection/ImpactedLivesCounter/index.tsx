import Heart from "assets/icons/heart.svg";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

type Props = {
  impactedLivesCount: number;
};
function ImpactedLivesCounter({ impactedLivesCount }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });

  return (
    <S.Container>
      <S.HeartImage src={Heart} alt="heart-image" />
      <S.CounterText>{impactedLivesCount}</S.CounterText>
      <S.ImpactedLivesText>{t("impactedLives")}</S.ImpactedLivesText>
    </S.Container>
  );
}

export default ImpactedLivesCounter;
