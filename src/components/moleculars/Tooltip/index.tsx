import theme from "styles/theme";
import * as S from "./styles";

export type Props = {
  text?: string;
  textRight?: string;
  symbol: string;
  isClick?: boolean;
  place?: "top" | "bottom" | "left" | "right";
  tooltipPosition?: "center" | "left" | "right";
  children?: JSX.Element;
  idTooltip: string;
};
function Tooltip({
  text,
  textRight,
  symbol,
  isClick,
  place = "top",
  children,
  tooltipPosition = "center",
  idTooltip,
}: Props): JSX.Element {
  function handleTooltipPosition() {
    return tooltipPosition === "right" ? "4.5%" : theme.spacing(0);
  }
  return (
    <S.Container>
      <S.TooltipContainer id={idTooltip}>
        <S.LeftContainer>
          <S.IconCircle>
            <S.Symbol>{symbol}</S.Symbol>
          </S.IconCircle>
        </S.LeftContainer>
        {textRight && (
          <S.RightContainer>
            <S.Text>{textRight}</S.Text>
          </S.RightContainer>
        )}
      </S.TooltipContainer>
      <S.TooltipBox
        anchorId={idTooltip}
        content={text}
        place={place}
        positionStrategy="fixed"
        events={isClick ? ["click"] : ["hover"]}
        tooltipPosition={handleTooltipPosition()}
      >
        {children}
      </S.TooltipBox>
    </S.Container>
  );
}

export default Tooltip;
