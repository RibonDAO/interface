import * as S from "./styles";

export type Props = {
  text: string;
  textRight?: string;
  symbol: string;
  isClick?: boolean;
  place?: "top" | "bottom" | "left" | "right";
};
function Tooltip({
  text,
  textRight,
  symbol,
  isClick,
  place = "top",
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.TooltipContainer id="tooltip">
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
        anchorId="tooltip"
        content={text}
        place={place}
        events={isClick ? ["click"] : ["hover"]}
      />
    </S.Container>
  );
}

export default Tooltip;
