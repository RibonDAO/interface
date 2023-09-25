import supportIcon from "assets/icons/support-icon.svg";

import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import { logEvent } from "lib/events";
import { useLanguage } from "hooks/useLanguage";
import { Languages } from "@ribon.io/shared/types";
import startSupportChat from "services/support";
import * as S from "./styles";

function UserSupportItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.userSupportItem",
  });
  const { currentLang } = useLanguage();

  const handleClick = () => {
    logEvent("supportBtn_click", {
      from: "config_page",
    });
    if (currentLang === Languages.PT) {
      window.open(t("userSupportLink"), "_blank");
    } else {
      startSupportChat();
    }
  };

  return (
    <S.Container onClick={handleClick}>
      <CardIconText
        text={t("userSupportText")}
        icon={supportIcon}
        rightComponent={<S.GoButton src={ArrowRight} onClick={handleClick} />}
      />
    </S.Container>
  );
}

export default UserSupportItem;
