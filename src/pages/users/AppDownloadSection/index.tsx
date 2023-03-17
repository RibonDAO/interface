/* eslint-disable @typescript-eslint/no-unused-vars */
import useBreakpoint from "hooks/useBreakpoint";
import { useState } from "react";
import { ANDROID_APP_LINK, IOS_APP_LINK, LINK_TREE } from "utils/constants";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "components/atomics/buttons/Button";
import AppleBadge from "./assets/apple-badge.png";
import GoogleBadge from "./assets/google-badge.png";
import QRCode from "./assets/appribon.png";

import * as S from "./styles";

export type Props = {
  title: string;
  image: string;
  description?: string;
  hasBackButton?: boolean;
  firstButton: ButtonProps;
  secondButton?: ButtonProps;
};

function AppDownloadSection({
  title,
  image,
  description,
  hasBackButton,
  firstButton,
  secondButton,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const [currentText, setCurrentText] = useState(t("copyText"));
  const [isCopy, setIsCopy] = useState(false);
  const { isMobile } = useBreakpoint();

  function handleReturnLinkDevice() {
    const { userAgent } = navigator;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return IOS_APP_LINK;
    } else {
      return ANDROID_APP_LINK;
    }
  }

  const copyText = () => {
    navigator.clipboard.writeText(LINK_TREE);
    setCurrentText(t("copiedText"));
    setIsCopy(true);
  };

  const render = () => {
    if (isMobile) {
      return (
        <>
          {description && <S.Description>{description}</S.Description>}
          <S.ButtonsContainer hasMenu={!hasBackButton}>
            <S.DownloadButton
              href={handleReturnLinkDevice()}
              textColor={firstButton.textColor}
              backgroundColor={firstButton.backgroundColor}
            >
              {firstButton.text}
            </S.DownloadButton>
            {hasBackButton && (
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
              <S.Description>{t("scanQrCode")}</S.Description>
              <S.QRCode src={QRCode} />
            </S.ImageContainer>
            <S.ImageContainer>
              <S.DescriptionBadge>{t("chooseStore")}</S.DescriptionBadge>
              <S.BorderContainer>
                <S.Link
                  href={ANDROID_APP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.ImageBadge src={GoogleBadge} />
                </S.Link>
                <S.Link
                  href={IOS_APP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.ImageBadge src={AppleBadge} />
                </S.Link>
              </S.BorderContainer>
            </S.ImageContainer>
          </S.Badges>

          <S.Description>{t("pasteLink")}</S.Description>
          <S.LinkContainer>
            <S.InputLink value={LINK_TREE} disabled />
            <S.Button copy={isCopy} onClick={copyText}>
              {currentText}
            </S.Button>
          </S.LinkContainer>
          {hasBackButton && (
            <S.FilledButton onClick={secondButton?.onClick}>
              {secondButton?.text}
            </S.FilledButton>
          )}
        </>
      );
    }
  };

  return (
    <S.Wrapper hasMenu={!hasBackButton}>
      <S.Image src={image} />
      <S.Title>{title}</S.Title>
      {render()}
    </S.Wrapper>
  );
}

export default AppDownloadSection;
