import React from "react";
import useNavigation from "hooks/useNavigation";
import BottomBanner from "components/atomics/BottomBanner";
import { useTranslation } from "react-i18next";
import useBreakpoint from "hooks/useBreakpoint";
import { APP_LINK } from "utils/constants";
import { useLanguage } from "hooks/useLanguage";

function DownloadAppToast(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { isMobile } = useBreakpoint();

  const { t } = useTranslation("translation", {
    keyPrefix: "downloadApp.floating",
  });

  const { currentLang } = useLanguage();

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      utm_source: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
      utm_medium: "floating_btn",
      utm_campaign: isMobile ? "mobile" : "desktop",
    });

    if (isMobile) {
      window.open(`${APP_LINK}?${queryParams}`);
      return;
    }

    navigateTo({
      pathname: "/app-download",
      search: queryParams.toString(),
    });
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
