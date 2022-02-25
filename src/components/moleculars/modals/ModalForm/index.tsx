import React from "react";
import ReactModal from "react-modal";
import theme from "styles/theme";
import Button, { onClickType } from "components/atomics/Button";
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
}: Props): JSX.Element {
  // eslint-disable-next-line no-use-before-define
  const [onChange, onSubmit, values] = useForm(handleOnSubmit, initialState);

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
      <form onSubmit={onSubmit as any}>
        <S.FormContainer>
          {formFields.map((field) => (
            <S.Input
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
