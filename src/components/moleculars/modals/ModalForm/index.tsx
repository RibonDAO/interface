import React, { FormEventHandler, useEffect } from "react";
import ReactModal from "react-modal";
import theme from "styles/theme";
import Button, { onClickType } from "components/atomics/buttons/Button";
import { useForm } from "hooks/useForm";
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
  primaryButtonText?: string | null;
  primaryButtonTextColor?: string;
  primaryButtonColor?: string;
  primaryButtonBorderColor?: string;
  primaryButtonCallback?: onClickType;
  primaryButtonDisabled?: boolean;
  secondaryButtonText?: string | null;
  secondaryButtonLink?: string;
  secondaryButtonTextColor?: string;
  secondaryButtonColor?: string;
  secondaryButtonBorderColor?: string;
  secondaryButtonCallback?: onClickType;
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
};

function ModalForm({
  visible = false,
  icon = null,
  title = null,
  titleColor,
  primaryButtonText = null,
  primaryButtonTextColor = "white",
  primaryButtonColor = theme.colors.ribonBlue,
  primaryButtonBorderColor,
  primaryButtonDisabled,
  secondaryButtonText = null,
  secondaryButtonTextColor = theme.colors.darkGray,
  secondaryButtonBorderColor,
  secondaryButtonColor = "white",
  primaryButtonCallback = () => {},
  secondaryButtonCallback = () => {},
  onClose = () => {},
  contentLabel,
  customStyles,
  formFields,
  initialState,
  onFormSubmit,
  footer,
  onValuesChange,
}: Props): JSX.Element {
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

          {primaryButtonText && (
            <Button
              text={primaryButtonText}
              textColor={primaryButtonTextColor}
              backgroundColor={primaryButtonColor}
              borderColor={primaryButtonBorderColor}
              onClick={primaryButtonCallback}
              type="submit"
              disabled={primaryButtonDisabled}
            />
          )}
        </S.FormContainer>
      </form>

      {secondaryButtonText && (
        <Button
          text={secondaryButtonText}
          textColor={secondaryButtonTextColor}
          backgroundColor={secondaryButtonColor}
          onClick={secondaryButtonCallback}
          borderColor={secondaryButtonBorderColor}
          type="submit"
        />
      )}

      <S.FooterContainer>{footer}</S.FooterContainer>
    </S.ModalWithIcon>
  );
}

export default ModalForm;
