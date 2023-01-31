import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import supportIcon from "assets/icons/support-icon-orange.svg";
import { ZendeskOpenChat } from "config/zendesk/features";
import * as S from "./styles";

function UserSupportSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection.userSupportCard",
  });

  const handleClick = () => {
    logEvent("UserSupportBtn_Click");
    ZendeskOpenChat();
  };

  return (
    <S.Container>
      <S.IconText>
        <S.Icon src={supportIcon} alt="support" />
        <S.Title>{t("title")}</S.Title>
      </S.IconText>

      <S.Description>{t("description")}</S.Description>
      <S.SupportButton text={t("primaryButtonText")} onClick={handleClick} />
    </S.Container>
  );
}
export default UserSupportSection;
