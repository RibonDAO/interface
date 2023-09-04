import useBreakpoint from "hooks/useBreakpoint";
import { APP_LINK, IOS_APP_LINK, ANDROID_APP_LINK } from "utils/constants";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "components/atomics/buttons/Button";
import { logEvent } from "lib/events";
import { useExperiment } from "@growthbook/growthbook-react";
import AppleBadge from "../AppDownloadTemplate/assets/apple-badge.png";
import GoogleBadge from "../AppDownloadTemplate/assets/google-badge.png";
import QRCode from "../AppDownloadTemplate/assets/qrcodeapp.svg";

import * as S from "./styles";

export type Props = {
  title: string;
  image: string;
  description?: string;
  hasBackButton?: boolean;
  firstButton: ButtonProps;
  secondButton?: ButtonProps;
  spacingTopDonationFlow?: boolean;
};

function AppDownloadTemplate({
  title,
  image,
  description,
  hasBackButton,
  firstButton,
  secondButton,
  spacingTopDonationFlow,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const { isMobile } = useBreakpoint();

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "product", "growth"],
  });

  function handleMobileLink() {
    logEvent("mobileDownloadBtn_click");
    window.open(APP_LINK);
  }

  function handleIosLink() {
    logEvent("appStoreBtn_click");
    window.open(IOS_APP_LINK);
  }

  function handleAndroidLink() {
    logEvent("gPlayBtn_click");
    window.open(ANDROID_APP_LINK);
  }

  const render = () => {
    if (isMobile) {
      return (
        <>
          {description && variation.value !== "product" && (
            <S.Description>{description}</S.Description>
          )}
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
        </>
      );
    } else {
      return (
        <>
          <S.Badges>
            <S.ImageContainer>
              <S.Description>
                {variation.value === "product"
                  ? t("newScanQrCode")
                  : t("ScanQrCode")}
              </S.Description>
              <S.QRCode src={QRCode} />
            </S.ImageContainer>
            <S.ImageContainer>
              <S.DescriptionBadge>{t("chooseStore")}</S.DescriptionBadge>
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
      {description && (
        <S.Description>
          {variation.value === "product" ? description : t("pasteLink")}
        </S.Description>
      )}
      {render()}
    </S.Wrapper>
  );
}

export default AppDownloadTemplate;
