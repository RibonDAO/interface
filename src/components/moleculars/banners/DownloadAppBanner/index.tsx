import { useEffect } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useIntegrationId } from "hooks/useIntegrationId";
import { logEvent } from "lib/events";
import { ANDROID_APP_LINK, APP_LINK, IOS_APP_LINK } from "utils/constants";
import MobilePng from "./assets/mobile.png";
import AppleBadge from "./assets/apple-badge.png";
import GoogleBadge from "./assets/google-badge.png";
import * as S from "./styles";

export default function DownlaodAppBanner() {
  const { t } = useTranslation("translation", {
    keyPrefix: "downloadAppBanner",
  });

  const { isMobile } = useBreakpoint();
  const integrationId = useIntegrationId();

  useEffect(() => {
    logEvent("downloadCTA_view", { from: "profileBanner" });
  }, []);

  function handleMobileLink() {
    logEvent("mobileDownloadBtn_click", { from: "profileBanner" });
    logEvent("downloadCTA_click", { from: "profileBanner" });
    window.open(`${APP_LINK}?integration_id=${integrationId}`);
  }

  function handleIosLink() {
    logEvent("appStoreBtn_click", { from: "profileBanner" });
    logEvent("downloadCTA_click", { from: "appStoreBtn" });
    window.open(IOS_APP_LINK);
  }

  function handleAndroidLink() {
    logEvent("gPlayBtn_click", { from: "profileBanner" });
    logEvent("downloadCTA_click", { from: "gPlayBtn" });
    window.open(ANDROID_APP_LINK);
  }

  const mobileRow = () => (
    <S.ButtonsRow>
      <S.MobileButton onClick={() => handleMobileLink()} text={t("cta")} />
    </S.ButtonsRow>
  );

  const desktopRow = () => (
    <S.ButtonsRow>
      <S.StoreImage
        src={AppleBadge}
        alt="Apple Store"
        onClick={() => handleIosLink()}
      />
      <S.StoreImage
        src={GoogleBadge}
        alt="Google Play"
        onClick={() => handleAndroidLink()}
      />
    </S.ButtonsRow>
  );

  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image src={MobilePng} alt="Mobile" />
      </S.ImageContainer>
      <S.TextContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Text>{t("subtitle")}</S.Text>
        {isMobile ? mobileRow() : desktopRow()}
      </S.TextContainer>
    </S.Container>
  );
}
