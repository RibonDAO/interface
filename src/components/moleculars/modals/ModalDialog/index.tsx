import React, { useState } from "react";
import Button, { ButtonProps } from "components/atomics/buttons/Button";
import theme from "styles/theme";
import { logEvent } from "lib/events";
import Icon from "components/atomics/Icon";
import useBreakpoint from "hooks/useBreakpoint";
import contactSupport from "lib/contactSupport";
import { useLanguage } from "hooks/useLanguage";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  type?: string;
  icon?: string;
  iconColor?: string;
  title?: string | null;
  description?: string | JSX.Element | null;
  highlightedText?: string | null | JSX.Element;
  primaryButton?: ButtonProps | null;
  secondaryButton?: ButtonProps | null;
  children?: JSX.Element[] | JSX.Element | null;
  eventName?: string;
  eventParams?: Record<string, any>;
  onClose?: () => void;
  supportButton?: boolean;
};

function ModalDialog({
  visible = false,
  supportButton = false,
  title = null,
  description = null,
  primaryButton = null,
  secondaryButton = null,
  children = null,
  highlightedText = null,
  eventName,
  eventParams,
  type,
  icon,
  iconColor,
  onClose = () => {},
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.modals.modalDialog",
  });

  const [logged, setLogged] = useState(false);

  const { isMobile } = useBreakpoint();

  const { currentLang } = useLanguage();

  if (visible && eventName && !logged) {
    logEvent(eventName, eventParams);
    setLogged(true);
  }

  const modalIcon = () => {
    if (icon) {
      return icon;
    }
    switch (type) {
      case "error":
        return "report";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  const titleColor = () => {
    switch (type) {
      case "error":
        return theme.colors.feedback.error[900];
      case "warning":
        return theme.colors.brand.quaternary[900];
      case "info":
        return theme.colors.feedback.informational[900];
      default:
        return theme.colors.feedback.informational[900];
    }
  };

  const themeColor = () => {
    switch (type) {
      case "error":
        return theme.colors.feedback.error[600];
      case "warning":
        return theme.colors.brand.quaternary[200];
      case "info":
        return theme.colors.feedback.informational[500];
      default:
        return theme.colors.feedback.informational[500];
    }
  };

  const primaryButtonTextColor = () => {
    switch (type) {
      case "warning":
        return theme.colors.neutral[900];

      default:
        return theme.colors.neutral10;
    }
  };

  const primaryButtonBackgroundColor = () => {
    switch (type) {
      case "error":
        return theme.colors.feedback.error[600];
      case "warning":
        return theme.colors.brand.quaternary[200];
      case "info":
        return theme.colors.brand.primary[600];
      default:
        return theme.colors.brand.primary[600];
    }
  };

  return (
    <S.Container
      isOpen={visible}
      onRequestClose={onClose}
      style={{
        ...defaultCustomStyles,
        overlay: {
          ...defaultCustomStyles.overlay,
          alignItems: isMobile ? "flex-end" : "center",
        },
      }}
      ariaHideApp={false}
    >
      <S.CloseIcon
        name="close"
        className="close"
        onClick={onClose}
        color={theme.colors.neutral[600]}
        size="24px"
      />
      {(type || icon) && (
        <Icon
          name={type ? modalIcon() : icon ?? ""}
          color={type ? themeColor() : iconColor}
          className={type ? modalIcon() : icon}
          size="40px"
        />
      )}
      {title && <S.Title style={{ color: titleColor() }}>{title}</S.Title>}
      {description && <S.Description>{description}</S.Description>}
      {highlightedText && (
        <S.HighlightedText>{highlightedText}</S.HighlightedText>
      )}
      {supportButton && (
        <Button
          text={t("accessUserSupport")}
          onClick={() => contactSupport(currentLang)}
          textColor={theme.colors.neutral[600]}
          backgroundColor={theme.colors.neutral10}
          borderColor={theme.colors.neutral[600]}
        />
      )}
      {primaryButton && (
        <Button
          text={primaryButton.text}
          textColor={primaryButtonTextColor()}
          backgroundColor={primaryButtonBackgroundColor()}
          onClick={primaryButton.onClick}
          eventName={primaryButton.eventName}
          eventParams={primaryButton.eventParams}
        />
      )}
      {secondaryButton && (
        <Button
          text={secondaryButton.text}
          textColor={theme.colors.neutral[600]}
          backgroundColor={theme.colors.neutral10}
          onClick={secondaryButton.onClick}
          borderColor={theme.colors.neutral[600]}
          eventName={secondaryButton.eventName}
          eventParams={secondaryButton.eventParams}
        />
      )}

      {children}
    </S.Container>
  );
}

export default ModalDialog;
