import MoreTicketsIcon from "assets/icons/more-tickets-icon-green.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useTranslation } from "react-i18next";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import * as S from "./styles";

function GetTheAppItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.getTheAppItem",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("downloadCTA_view", {
      from: "config_page",
    });
  }, []);

  const handleClick = () => {
    logEvent("downloadCTA_click", { from: "config_page" });
    navigateTo("/app-download");
  };

  return (
    <S.Container onClick={handleClick}>
      <CardIconText
        text={t("getTheAppText")}
        icon={MoreTicketsIcon}
        rightComponent={<S.GoButton src={ArrowRight} onClick={handleClick} />}
      />
    </S.Container>
  );
}

export default GetTheAppItem;
