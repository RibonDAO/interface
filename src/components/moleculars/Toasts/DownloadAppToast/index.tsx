import React, { useEffect } from "react";
import ButtonToast from "components/atomics/buttons/ButtonToast";
import DownloadIcon from "assets/icons/download-app-icon-orange.svg";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";

function DownloadAppToast(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "downloadApp.floating",
  });

  useEffect(() => {
    logEvent("webDwnldCta_view", { from: "floatingBtn" });
  }, []);

  const { navigateTo } = useNavigation();

  const handleClick = () => {
    logEvent("webDwnldCta_click", { from: "floatingBtn" });
    navigateTo("/app-in-development");
  };

  return (
    <ButtonToast
      text={t("title")}
      leftIcon={DownloadIcon}
      onClick={handleClick}
    />
  );
}

export default DownloadAppToast;
