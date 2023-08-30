import theme from "styles/theme";
import Heart from "assets/icons/heart.svg";
import * as S from "./styles";

export type Props = {
  outline?: boolean;
};
function ImpactedLivesCounter({ outline = false }: Props): JSX.Element {
  return (
    <S.Container outline={outline}>
      <S.LivesAmount color={theme.colors.brand.tertiary[300]}>40</S.LivesAmount>
      <S.Image src={Heart} />
    </S.Container>
  );
}

export default ImpactedLivesCounter;
