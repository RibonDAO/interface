import Tooltip from "components/moleculars/Tooltip";
import * as S from "./styles";

export type Props = {
  icon?: string;
  title?: string | number;
  text?: string | JSX.Element;
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
}: Props): JSX.Element {
  return (
    <S.Container size={size}>
      {icon && <S.Image src={icon} />}
      <S.Title textColor={titleColor}>{title}</S.Title>
      <S.Value textColor={valueColor}>{value}</S.Value>
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
    </S.Container>
  );
}

export default CardTooltip;
