import React from "react";
import useNavigation from "hooks/useNavigation";
import BottomBanner from "components/atomics/BottomBanner";
import { useTranslation } from "react-i18next";
import useBreakpoint from "hooks/useBreakpoint";
import { APP_LINK } from "utils/constants";

function DownloadAppToast(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { isMobile } = useBreakpoint();

  const { t } = useTranslation("translation", {
    keyPrefix: "downloadApp.floating",
  });

  const handleClick = () => {
    if (isMobile) {
      window.open(APP_LINK);
      return;
    }
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
