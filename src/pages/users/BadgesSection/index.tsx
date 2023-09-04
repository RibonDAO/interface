import { useTranslation } from "react-i18next";
import useUserBadges from "hooks/useUserBadges";
import BadgeCard from "pages/users/BadgesSection/BadgeCard";
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
          <BadgeCard badge={badge} key={badge.id} />
        ))}
      </S.BadgesContainer>
    </S.Container>
  );
}

export default BadgesSection;
