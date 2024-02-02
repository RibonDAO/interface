import React from "react";
import useNavigation from "hooks/useNavigation";
import BottomBanner from "components/atomics/BottomBanner";
import { useTranslation } from "react-i18next";

function DownloadAppToast(): JSX.Element {
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "downloadApp.floating",
  });

  const handleClick = () => {
    navigateTo("/app-download");
  };

  return (
    <BottomBanner
      text={t("title")}
      ctaText={t("cta")}
      onClick={handleClick}
      eventName="downloadCTA"
      eventParams={{ from: "floatingBtn" }}
    />
  );
}

export default DownloadAppToast;
