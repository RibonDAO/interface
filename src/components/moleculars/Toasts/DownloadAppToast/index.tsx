import React from "react";
import ButtonToast from "components/atomics/buttons/ButtonToast";
import DownloadIcon from "assets/icons/download-app-icon-orange.svg";
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
      leftIcon={DownloadIcon}
      onClick={handleClick}
      eventName="webDwnldCta"
      eventParams={{ from: "floatingBtn" }}
    />
  );
}

export default DownloadAppToast;
