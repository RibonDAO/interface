import Tooltip from "components/moleculars/Tooltip";
import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element | JSX.Element[];
  titleColor?: string;
  textColor?: string;
  value?: string | number;
  infoLeft?: string;
  tooltipSymbol: string;
  tooltipText?: string;
  children?: JSX.Element;
  valueColor?: string;
  tooltipPosition?: "center" | "left" | "right";
  idTooltip: string;
  size?: "large";
  label?: string;
  onPress?: () => void;
  callToAction?: string;
};
function CardTooltip({
  icon,
  title,
  text,
  value,
  infoLeft,
  tooltipSymbol,
  tooltipText,
  children,
  titleColor,
  valueColor,
  tooltipPosition = "center",
  idTooltip,
  size,
  label,
  onPress,
  callToAction,
}: Props): JSX.Element {
  const press = () => {
    if (onPress) onPress();
  };

  return (
    <S.Container size={size} onClick={() => press()}>
      {icon && <S.Image src={icon} />}
      <S.Title textColor={titleColor}>{title}</S.Title>
      <S.Value textColor={valueColor}>{value}</S.Value>
      {label && <S.Label>{label}</S.Label>}
      {text && <S.Text>{text}</S.Text>}
      <S.InfoContainer>
        <S.InfoLeft>{infoLeft}</S.InfoLeft>
        {tooltipText && (
          <Tooltip
            text={tooltipText}
            symbol={tooltipSymbol}
            tooltipPosition={tooltipPosition}
            idTooltip={idTooltip}
          />
        )}
        {children && (
          <Tooltip
            symbol={tooltipSymbol}
            tooltipPosition={tooltipPosition}
            idTooltip={idTooltip}
          >
            {children}
          </Tooltip>
        )}
      </S.InfoContainer>
      {callToAction && <S.CallToAction>{callToAction}</S.CallToAction>}
    </S.Container>
  );
}

export default CardTooltip;
