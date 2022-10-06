import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import * as S from "./styles";

function UserSupportSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection.userSupportCard",
  });

  const handleClick = () => {
    logEvent("UserSupportBtn_Click");
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.Description>{t("description")}</S.Description>
      <S.SupportButton text={t("primaryButtonText")} onClick={handleClick} />
    </S.Container>
  );
}
export default UserSupportSection;
