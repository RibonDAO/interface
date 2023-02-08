import React, { useState } from "react";
import Button from "components/atomics/buttons/Button";
import ReactModal from "react-modal";
import { newLogEvent } from "lib/events";
import { ZendeskOpenChat } from "config/zendesk/features";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import errorIcon from "./assets/alert.svg";
import warningIcon from "./assets/warning-icon.svg";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type Props = {
  visible?: boolean;
  title?: string | null;
  titleColor?: string;
  body?: string | null;
  contentLabel?: string;
  onClose?: () => void;
  customStyles?: ReactModal.Styles;
  buttonText?: string;
  warning?: boolean;
  eventName?: string;
  eventParams?: Record<string, any>;
};
function ModalError({
  visible = false,
  title = null,
  titleColor,
  body = null,
  onClose = () => {},
  contentLabel,
  customStyles,
  buttonText,
  warning,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
  }

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.modalForm",
  });

  const handleClick = () => {
    ZendeskOpenChat();
  };
  return (
    <S.ModalWithIcon
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles || defaultCustomStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      <S.Icon src={warning ? warningIcon : errorIcon} />
      <S.Title color={titleColor}>{title}</S.Title>
      <S.Body>{body}</S.Body>
      <S.SupportButton text={t("accessUserSupport")} onClick={handleClick} />
      {buttonText && <Button text={buttonText} onClick={onClose} />}
    </S.ModalWithIcon>
  );
}

export default ModalError;
