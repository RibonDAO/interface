import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import directIllustration from "../assets/direct-illustration.svg";
import * as S from "./styles";

function CommunitySection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.communitySection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-cause");
  };
  return (
    <S.EmptySectionContainer>
      <S.EmptyImage src={directIllustration} />
      <S.EmptyTitle>{t("emptyTitle")}</S.EmptyTitle>
      <S.EmptyText>{t("emptyText")}</S.EmptyText>
      <S.EmptyButton text={t("emptyButton")} onClick={handleEmptyButtonClick} />
    </S.EmptySectionContainer>
  );
}

export default CommunitySection;
