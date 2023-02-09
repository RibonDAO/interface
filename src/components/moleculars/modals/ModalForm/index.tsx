import React, { FormEventHandler, useEffect, useState } from "react";
import ReactModal from "react-modal";
import Button, { ButtonProps } from "components/atomics/buttons/Button";
import { useForm } from "hooks/useForm";
import theme from "styles/theme";
import { newLogEvent } from "lib/events";
import * as S from "./styles";
import { defaultCustomStyles } from "../defaultCustomStyles";

export type FieldProps = {
  name: string;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
};

export type Props = {
  visible?: boolean;
  icon?: string | null;
  title?: string | null;
  titleColor?: string;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  contentLabel?: string;
  onClose?: () => void;
  highlightedText?: string;
  zIndex?: number;
  animationData?: Record<any, any>;
  customStyles?: ReactModal.Styles;
  formFields: FieldProps[];
  initialState: Record<any, any>;
  onFormSubmit: (values: Record<any, any>) => void;
  footer?: JSX.Element;
  onValuesChange?: (values: Record<any, any>) => void;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalForm({
  visible = false,
  icon = null,
  title = null,
  titleColor,
  primaryButton,
  secondaryButton,
  onClose = () => {},
  contentLabel,
  customStyles,
  formFields,
  initialState,
  onFormSubmit,
  footer,
  onValuesChange,
  eventName,
  eventParams,
}: Props): JSX.Element {
  const [logged, SetLogged] = useState(false);

  if (visible && eventName && !logged) {
    newLogEvent("view", eventName, eventParams);
    SetLogged(true);
  }

  // eslint-disable-next-line no-use-before-define
  const [onChange, onSubmit, values] = useForm(handleOnSubmit, initialState);

  useEffect(() => {
    if (onValuesChange) onValuesChange(values);
  }, [values]);

  function handleOnSubmit() {
    onFormSubmit(values);
  }

  function renderIcon() {
    return icon && <S.Icon src={icon} />;
  }

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
      <form onSubmit={onSubmit as FormEventHandler<HTMLFormElement>}>
        <S.FormContainer>
          {formFields.map((field) => (
            <S.Input
              key={field.id}
              name={field.name}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              onChange={onChange as any}
              required={field.required}
            />
          ))}

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
              disabled={primaryButton.disabled}
              type="submit"
            />
          )}
        </S.FormContainer>
      </form>

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
          type="submit"
        />
      )}

      <S.FooterContainer>{footer}</S.FooterContainer>
    </S.ModalWithIcon>
  );
}

export default ModalForm;
