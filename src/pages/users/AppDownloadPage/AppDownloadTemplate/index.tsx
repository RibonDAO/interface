import useBreakpoint from "hooks/useBreakpoint";
import { useState } from "react";
import { APP_LINK } from "utils/constants";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "components/atomics/buttons/Button";
import AppleBadge from "./assets/apple-badge.png";
import GoogleBadge from "./assets/google-badge.png";
import QRCode from "./assets/qrcodeapp.svg";

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

  const [currentText, setCurrentText] = useState(t("copyText"));
  const [isCopy, setIsCopy] = useState(false);
  const { isMobile } = useBreakpoint();

  function handleReturnLinkDevice() {
    return APP_LINK;
  }

  const copyText = () => {
    navigator.clipboard.writeText(APP_LINK);
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
              hasAnotherButton={!!secondButton}
              onClick={firstButton.onClick}
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
              <S.Description>{t("scanQrCode")}</S.Description>
              <S.QRCode src={QRCode} />
            </S.ImageContainer>
            <S.ImageContainer>
              <S.DescriptionBadge>{t("chooseStore")}</S.DescriptionBadge>
              <S.BorderContainer>
                <S.Link
                  href={APP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.ImageBadge src={GoogleBadge} />
                </S.Link>
                <S.Link
                  href={APP_LINK}
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
            <S.InputLink value={APP_LINK} disabled />
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
    <S.Wrapper hasMenu={!hasBackButton} hasMarginTop={spacingTopDonationFlow}>
      <S.Image src={image} />
      <S.Title>{title}</S.Title>
      {render()}
    </S.Wrapper>
  );
}

export default AppDownloadTemplate;
