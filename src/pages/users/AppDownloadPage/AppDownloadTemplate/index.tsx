import { useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import {
  ANDROID_APP_LINK,
  APP_LINK,
  DAPP_URL,
  IOS_APP_LINK,
} from "utils/constants";
import { useTranslation } from "react-i18next";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { useCountdown } from "hooks/useCountdown";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import { generateUrlSignature } from "lib/urlSignature";
import { QRCodeSVG } from "qrcode.react";
import Icon from "components/atomics/Icon";
import { useLanguage } from "hooks/useLanguage";
import theme from "styles/theme";
import { ButtonProps } from "components/atomics/buttons/Button";
import { logEvent } from "lib/events";
import { useIntegrationId } from "hooks/useIntegrationId";
import AppleBadge from "./assets/apple-badge-sm.png";
import GoogleBadge from "./assets/google-badge-sm.png";
import * as S from "./styles";

export type Props = {
  title: string;
  image: string;
  hasBackButton?: boolean;
  firstButton: ButtonProps;
  secondButton?: ButtonProps;
  spacingTopDonationFlow?: boolean;
};

function AppDownloadTemplate({
  title,
  image,
  hasBackButton,
  firstButton,
  secondButton,
  spacingTopDonationFlow,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const [now] = useState(new Date().getTime());
  const [countdownVisible, setCountdownVisible] = useState(true);
  const integrationId = useIntegrationId();

  const renderCountDown = () => {
    const nowPlus5min = now + 5 * 60 * 1000;

    const countdown = useCountdown(nowPlus5min, () =>
      setCountdownVisible(false),
    );

    if (!countdownVisible) return null;

    return (
      <S.CountdownContainer>
        <Icon
          name="nest_clock_farsight_analog"
          color={theme.colors.neutral[500]}
          size="20px"
        />{" "}
        {
          t("offerExpiresIn", {
            time: formatCountdown(countdown),
          }) as string
        }
      </S.CountdownContainer>
    );
  };

  const { isMobile } = useBreakpoint();
  const { currentLang } = useLanguage();

  const utmParamsFor = (campaign: string) => ({
    utmSource: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
    utmMedium: "download_cta_screen",
    utmCampaign: campaign as string,
  });

  function handleMobileLink() {
    logEvent("mobileDownloadBtn_click", { ...utmParamsFor("mobile") });
    logEvent("downloadCTA_click", {
      from: "downloadPageBtn",
      ...utmParamsFor("mobile"),
    });

    const params = new URLSearchParams({
      integration_id: integrationId as string,
      ...utmParamsFor("mobile"),
    });

    window.open(`${APP_LINK}?${params.toString()}`);
  }

  function handleIosLink() {
    logEvent("appStoreBtn_click", { ...utmParamsFor("desktop_ios") });
    logEvent("downloadCTA_click", {
      from: "appStoreBtn",
      ...utmParamsFor("desktop_ios"),
    });
    window.open(IOS_APP_LINK);
  }

  function handleAndroidLink() {
    logEvent("gPlayBtn_click", { ...utmParamsFor("desktop_android") });
    logEvent("downloadCTA_click", {
      from: "gPlayBtn",
      ...utmParamsFor("desktop_android"),
    });
    window.open(ANDROID_APP_LINK);
  }

  const buildLink = () => {
    const utmParams = getUTMFromLocationSearch(window.location.search);
    const baseUrl = `${DAPP_URL}redirect/`;

    const redirectParams = new URLSearchParams({
      utm_medium: utmParams.utmMedium,
      utm_source: utmParams.utmSource,
      utm_campaign: utmParams.utmCampaign,
      event: "qrCodeButton_click",
      redirect_url: APP_LINK,
      signature: generateUrlSignature(encodeURIComponent(APP_LINK)),
    });

    return `${baseUrl}?${redirectParams.toString()}`;
  };

  const render = () => {
    if (isMobile) {
      return (
        <S.ButtonsContainer hasMenu={!hasBackButton}>
          <S.DownloadButton
            onClick={() => handleMobileLink()}
            textColor={firstButton.textColor}
            backgroundColor={firstButton.backgroundColor}
            hasAnotherButton={!!secondButton}
          >
            {firstButton.text}
          </S.DownloadButton>
          {secondButton && (
            <S.Button onClick={secondButton?.onClick}>
              {secondButton?.text}
            </S.Button>
          )}
        </S.ButtonsContainer>
      );
    } else {
      return (
        <>
          <S.Badges>
            <S.ImageContainer>
              <QRCodeSVG value={buildLink()} size={120} />
            </S.ImageContainer>
            <S.ImageContainer>
              <S.BorderContainer>
                <S.Link
                  onClick={() => handleAndroidLink()}
                  rel="noopener noreferrer"
                >
                  <S.ImageBadge src={GoogleBadge} />
                </S.Link>
                <S.Link
                  onClick={() => handleIosLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.ImageBadge src={AppleBadge} />
                </S.Link>
              </S.BorderContainer>
            </S.ImageContainer>
          </S.Badges>
          {hasBackButton && (
            <S.Button onClick={secondButton?.onClick}>
              {secondButton?.text}
            </S.Button>
          )}
        </>
      );
    }
  };

  return (
    <S.Wrapper hasMenu={!hasBackButton} hasMarginTop={spacingTopDonationFlow}>
      <S.Image src={image} />
      <S.Title>{title}</S.Title>
      {renderCountDown()}
      {render()}
    </S.Wrapper>
  );
}

export default AppDownloadTemplate;
