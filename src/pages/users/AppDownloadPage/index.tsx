import { useTranslation } from "react-i18next";
import LeftArrow from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useState } from "react";
import useBreakpoint from "hooks/useBreakpoint";
import { ANDROID_APP_LINK, IOS_APP_LINK, LINK_TREE } from "utils/constants";
import * as S from "./styles";
import IllustrationMobile from "./assets/illustration-mobile.svg";
import LeftImage from "./assets/left-image.svg";
import RightImage from "./assets/right-image.svg";
import AppleBadge from "./assets/apple-badge.png";
import GoogleBadge from "./assets/google-badge.png";
import QRCode from "./assets/appribon.png";

function AppDownloadPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "appDownloadPage",
  });

  const { navigateBack } = useNavigation();
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

  const handleGoBack = () => {
    navigateBack();
  };

  const copyText = () => {
    navigator.clipboard.writeText(LINK_TREE);
    setCurrentText(t("copiedText"));
    setIsCopy(true);
  };

  const render = () => {
    if (isMobile) {
      return (
        <>
          <S.Description>{t("description")}</S.Description>
          <S.ButtonsContainer>
            <S.DownloadButton href={handleReturnLinkDevice()}>
              {t("buttonDownloadApp")}
            </S.DownloadButton>
            <S.Button onClick={handleGoBack}>{t("button")}</S.Button>
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
          <S.FilledButton onClick={handleGoBack}>{t("button")}</S.FilledButton>
        </>
      );
    }
  };

  return (
    <>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />

      <S.Container>
        <S.LeftArrow
          src={LeftArrow}
          alt="back-arrow-button"
          onClick={() => handleGoBack()}
        />
        <S.Wrapper>
          <S.Image src={IllustrationMobile} />
          <S.Title>{t("title")}</S.Title>
          {render()}
        </S.Wrapper>
      </S.Container>
    </>
  );
}

export default AppDownloadPage;
