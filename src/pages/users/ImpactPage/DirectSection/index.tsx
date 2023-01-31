import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import directIllustration from "../assets/direct-illustration.svg";
import * as S from "./styles";

function DirectSection() {
  const { navigateTo } = useNavigation();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.directSection",
  });
  const handleEmptyButtonClick = () => {
    navigateTo("/promoters/support-non-profit");
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

export default DirectSection;
