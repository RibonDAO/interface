import supportIcon from "assets/icons/support-icon.svg";

import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import { logEvent, newLogEvent } from "lib/events";
import * as S from "./styles";

function UserSupportItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.userSupportItem",
  });

  const handleClick = () => {
    logEvent("UserSupportBtn_Click");
    window.open(t("userSupportLink"), "_blank");

    newLogEvent("click", "userSupportBtn_click", { from: "config_page" });
  };

  return (
    <S.Container>
      <CardIconText
        text={t("userSupportText")}
        icon={supportIcon}
        rightComponent={<S.GoButton src={ArrowRight} onClick={handleClick} />}
      />
    </S.Container>
  );
}

export default UserSupportItem;
