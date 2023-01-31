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
  tooltipText: string;
};
function CardTextImageTooltip({
  icon,
  title,
  text,
  value,
  infoLeft,
  tooltipSymbol,
  tooltipText,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.Image src={icon} />
      <S.Title>{title}</S.Title>
      <S.Value>{value}</S.Value>
      <S.Text>{text}</S.Text>
      <S.InfoContainer>
        <S.InfoLeft>{infoLeft}</S.InfoLeft>
        <Tooltip text={tooltipText} symbol={tooltipSymbol} />
      </S.InfoContainer>
    </S.Container>
  );
}

export default CardTextImageTooltip;
