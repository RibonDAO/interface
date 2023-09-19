import React from "react";
import ButtonToast from "components/atomics/buttons/ButtonToast";
import MoreTicketsIcon from "assets/icons/more-tickets-icon-orange.svg";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";

function DownloadAppToast(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "downloadApp.floating",
  });

  const { navigateTo } = useNavigation();

  const handleClick = () => {
    navigateTo("/app-download");
  };

  return (
    <ButtonToast
      text={t("title")}
      leftIcon={MoreTicketsIcon}
      onClick={handleClick}
      eventName="downloadCTA"
      eventParams={{ from: "floatingBtn" }}
    />
  );
}

export default DownloadAppToast;
