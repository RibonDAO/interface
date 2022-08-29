import Button, { onClickType } from "components/atomics/buttons/Button";
import LottieAnimation from "components/atomics/LottieAnimation";
import theme from "styles/theme";
import { defaultCustomStyles } from "../defaultCustomStyles";
import * as S from "./styles";

type RowProps = {
  id: number;
  icon: string;
  text: string;
};

export type Props = {
  visible?: boolean;
  rowsContent?: Record<any, any> | null;
  title?: string | null;
  titleColor?: string;
  primaryButtonText?: string | null;
  primaryButtonLeftIcon?: string | undefined;
  primaryButtonLink?: string;
  primaryButtonTextColor?: string;
  primaryButtonColor?: string;
  primaryButtonBorderColor?: string;
  primaryButtonCallback?: onClickType;
  secondaryButtonText?: string | null;
  secondaryButtonLeftIcon?: string | undefined;
  secondaryButtonLink?: string;
  secondaryButtonTextColor?: string;
  secondaryButtonColor?: string;
  secondaryButtonBorderColor?: string;
  secondaryButtonCallback?: onClickType;
  contentLabel?: string;
  children?: JSX.Element[] | null;
  onClose?: () => void;
  animationData?: Record<any, any>;
};

function ModalRows({
  visible = false,
  rowsContent = null,
  title = null,
  titleColor,
  primaryButtonText = null,
  primaryButtonLeftIcon = undefined,
  primaryButtonTextColor = "white",
  primaryButtonColor = theme.colors.mediumGreen,
  primaryButtonBorderColor,
  secondaryButtonText = null,
  secondaryButtonLeftIcon = undefined,
  secondaryButtonTextColor = theme.colors.mediumGray,
  secondaryButtonBorderColor,
  secondaryButtonColor = "white",
  primaryButtonCallback = () => {},
  secondaryButtonCallback = () => {},
  onClose = () => {},
  contentLabel,
  animationData,
}: Props): JSX.Element {
  return (
    <S.ModalWithIcon
      isOpen={visible}
      onRequestClose={onClose}
      style={defaultCustomStyles}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      {animationData && (
        <S.Animation>
          <LottieAnimation
            animationData={animationData}
            width={200}
            height={150}
          />
        </S.Animation>
      )}
      <S.RowsModalContainer>
        <S.Title color={titleColor}>{title}</S.Title>
        <S.RowsModalSection>
          {rowsContent &&
            rowsContent.map((row: RowProps) => (
              <S.RowsModalRow key={row.id}>
                {row.icon && <S.RowsModalIcon src={row.icon} />}
                <S.RowsModalText>{row.text}</S.RowsModalText>
              </S.RowsModalRow>
            ))}
        </S.RowsModalSection>
        {primaryButtonText && (
          <Button
            leftIcon={primaryButtonLeftIcon}
            text={primaryButtonText}
            textColor={primaryButtonTextColor}
            backgroundColor={primaryButtonColor}
            borderColor={primaryButtonBorderColor}
            onClick={primaryButtonCallback}
          />
        )}
        {secondaryButtonText && (
          <Button
            leftIcon={secondaryButtonLeftIcon}
            text={secondaryButtonText}
            textColor={secondaryButtonTextColor}
            backgroundColor={secondaryButtonColor}
            onClick={secondaryButtonCallback}
            borderColor={secondaryButtonBorderColor}
          />
        )}
      </S.RowsModalContainer>
    </S.ModalWithIcon>
  );
}

export default ModalRows;
