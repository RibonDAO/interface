import React, { useState } from "react";
import ReactModal from "react-modal";
import Button, { ButtonProps } from "components/atomics/buttons/Button";
import theme from "styles/theme";
import { newLogEvent } from "lib/events";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  icon?: string | null;
  altIcon?: string;
  biggerIcon?: boolean;
  roundIcon?: boolean;
  title?: string | null;
  titleColor?: string;
  body?: string | JSX.Element | null;
  primaryButton?: ButtonProps | null;
  secondaryButton?: ButtonProps | null;
  supportButton?: boolean;
  contentLabel?: string;
  onClose?: () => void;
  highlightedText?: string;
  zIndex?: number;
  animationData?: Record<any, any>;
  customStyles?: ReactModal.Styles;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalIcon({
  visible = false,
  icon = null,
  altIcon = "icon",
  biggerIcon = false,
  roundIcon = false,
  title = null,
  titleColor,
  body = null,
  primaryButton = null,
  secondaryButton = null,
  supportButton = false,
  onClose = () => {},
  contentLabel,
  highlightedText,
  customStyles,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.modalForm",
  });

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
  }

  function renderIcon() {
    if (biggerIcon) return icon && <S.BiggerIcon src={icon} alt={altIcon} />;
    if (roundIcon) return icon && <S.RoundIcon src={icon} alt={altIcon} />;

    return icon && <S.Icon src={icon} />;
  }

  const handleSupportButtonClick = () => {
    window.open(t("userSupportLink"), "_blank");
    newLogEvent("click", "support_Btn", { from: "error_modal" });
  };

  return (
    <S.ModalWithIcon
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles || defaultCustomStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {renderIcon()}
      {title && <S.Title color={titleColor}>{title}</S.Title>}
      {body && (
        <S.Body>
          {body}
          {highlightedText && (
            <S.HighlightedText>{highlightedText}</S.HighlightedText>
          )}
        </S.Body>
      )}
      {supportButton && (
        <S.SupportButton
          text={t("accessUserSupport")}
          onClick={handleSupportButtonClick}
        />
      )}
      {primaryButton && (
        <Button
          leftIcon={primaryButton.leftIcon}
          text={primaryButton.text}
          textColor={primaryButton.textColor}
          backgroundColor={primaryButton.color}
          borderColor={primaryButton.borderColor}
          onClick={primaryButton.onClick}
          eventName={primaryButton.eventName}
          eventParams={primaryButton.eventParams}
        />
      )}
      {secondaryButton && (
        <Button
          leftIcon={secondaryButton.leftIcon}
          text={secondaryButton.text}
          textColor={secondaryButton.textColor || theme.colors.neutral[500]}
          backgroundColor={
            secondaryButton.backgroundColor || theme.colors.neutral10
          }
          onClick={secondaryButton.onClick}
          borderColor={secondaryButton.borderColor}
          eventName={secondaryButton.eventName}
          eventParams={secondaryButton.eventParams}
        />
      )}
    </S.ModalWithIcon>
  );
}

export default ModalIcon;
