import { useTranslation } from "react-i18next";
import useUserBadges from "hooks/useUserBadges";
import * as S from "./styles";

function BadgesSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.badgesSection",
  });
  const { badges } = useUserBadges();

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.BadgesContainer>
        {badges.map((badge) => (
          <S.BadgeContainer achieved={badge.achieved}>
            <S.BadgeImage src={badge.image} alt={badge.name} />
          </S.BadgeContainer>
        ))}
      </S.BadgesContainer>
    </S.Container>
  );
}

export default BadgesSection;
