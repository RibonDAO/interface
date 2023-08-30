import theme from "styles/theme";
import Heart from "assets/icons/heart.svg";
import useUserLevel from "hooks/useUserLevel";
import * as S from "./styles";

export type Props = {
  outline?: boolean;
};
function ImpactedLivesCounter({ outline = false }: Props): JSX.Element {
  const { userExperience: impactedLives } = useUserLevel();

  return (
    <S.Container outline={outline}>
      <S.LivesAmount color={theme.colors.brand.tertiary[300]}>
        {impactedLives}
      </S.LivesAmount>
      <S.Image src={Heart} />
    </S.Container>
  );
}

export default ImpactedLivesCounter;
