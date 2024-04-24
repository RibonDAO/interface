import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import securityIcon from "assets/icons/security-mark-icon.svg";
import infoIcon from "assets/icons/info-icon-white.svg";
import { theme } from "@ribon.io/shared/styles";
import useBreakpoint from "hooks/useBreakpoint";
import { logEvent } from "lib/events";
import { useLanguage } from "hooks/useLanguage";
import { ANDROID_APP_LINK, APP_LINK, IOS_APP_LINK } from "utils/constants";
import { useIntegrationId } from "hooks/useIntegrationId";
import AppleBadge from "assets/images/apple-badge.png";
import GoogleBadge from "assets/images/google-badge.png";
import * as S from "./styles";

export type Props = {
  image: string;
  title?: string | JSX.Element;
  buttonText: string;
  onClickButton: () => void;
  onClickImage?: () => void;
  softDisabled?: boolean;
  disabled?: boolean;
  infoTextTop?: string;
  fullWidth?: boolean;
  infoText?: string;
  secondButtonProps?: {
    text: string;
    onClick: () => void;
    visible: boolean;
  };
  iconSubtitle?: {
    icon: string;
    boldText: string;
    text: string;
  };
  isLocked?: boolean;
};
function CardCenterImageButton({
  image,
  title,
  buttonText,
  onClickButton,
  onClickImage,
  disabled,
  softDisabled,
  infoTextTop,
  fullWidth = false,
  infoText,
  secondButtonProps,
  iconSubtitle,
  isLocked = false,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "unlockNonProfitBanner",
  });

  const { isMobile } = useBreakpoint();
  const integrationId = useIntegrationId();
  const { currentLang } = useLanguage();

  const utmParamsFor = (campaign: string) => ({
    utmSource: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
    utmMedium: "blocked_nonprofit",
    utmCampaign: campaign,
  });

  function handleMobileLink() {
    logEvent("mobileDownloadBtn_click", {
      from: "unlockNonProfitBanner",
      ...utmParamsFor("mobile"),
    });
    logEvent("downloadCTA_click", {
      from: "unlockNonProfitBanner",
      ...utmParamsFor("mobile"),
    });
    window.open(`${APP_LINK}?integration_id=${integrationId}`);
  }

  function handleIosLink() {
    logEvent("appStoreBtn_click", {
      from: "unlockNonProfitBanner",
      ...utmParamsFor("desktop_ios"),
    });
    logEvent("downloadCTA_click", {
      from: "appStoreBtn",
      ...utmParamsFor("desktop_ios"),
    });
    window.open(IOS_APP_LINK);
  }

  function handleAndroidLink() {
    logEvent("gPlayBtn_click", {
      from: "unlockNonProfitBanner",
      ...utmParamsFor("desktop_android"),
    });
    logEvent("downloadCTA_click", {
      from: "gPlayBtn",
      ...utmParamsFor("desktop_android"),
    });
    window.open(ANDROID_APP_LINK);
  }

  const renderMobileButton = () => (
    <Button
      onClick={() => handleMobileLink()}
      text={t("cta")}
      backgroundColor={theme.colors.neutral10}
      textColor={theme.colors.brand.primary[600]}
    />
  );

  const renderStoreButtons = () => (
    <>
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
    </>
  );

  return (
    <S.Container fullWidth={fullWidth}>
      {isLocked && (
        <S.Overlay>
          <Icon name="lock" size="40" color={theme.colors.neutral10} />
          <S.OverlayText>{t("title")}</S.OverlayText>
          {isMobile ? renderMobileButton() : renderStoreButtons()}
        </S.Overlay>
      )}
      <S.ImageSection onClick={onClickImage}>
        {infoText && (
          <S.InfoText>
            <img src={infoIcon} alt="info" />
            {infoText}
          </S.InfoText>
        )}
        <S.Image src={image} alt="image" />
        <S.ImageDescription>{title}</S.ImageDescription>

        <S.DarkStroke />
      </S.ImageSection>

      <S.ContentSection>
        <S.InfoContainer>
          {infoTextTop && (
            <S.InfoIcon>
              <S.Info>{infoTextTop}</S.Info>
              <S.Icon src={securityIcon} />
            </S.InfoIcon>
          )}
          {iconSubtitle && (
            <S.IconSubtitleContainer>
              <S.SubtitleIcon src={iconSubtitle.icon} />
              <S.IconSubtitleText>
                <S.BoldText>{iconSubtitle.boldText}</S.BoldText>
                {iconSubtitle.text}
              </S.IconSubtitleText>
            </S.IconSubtitleContainer>
          )}
        </S.InfoContainer>
        <S.ButtonContainer>
          <Button
            onClick={onClickButton}
            text={buttonText}
            softDisabled={softDisabled}
            disabled={disabled}
            backgroundColor={theme.colors.brand.primary[600]}
          />
          {secondButtonProps?.visible && (
            <Button
              onClick={secondButtonProps.onClick}
              text={secondButtonProps.text}
              backgroundColor={theme.colors.neutral10}
              borderColor={theme.colors.brand.primary[600]}
              textColor={theme.colors.brand.primary[600]}
              outline
            />
          )}
        </S.ButtonContainer>
      </S.ContentSection>
    </S.Container>
  );
}

export default CardCenterImageButton;
