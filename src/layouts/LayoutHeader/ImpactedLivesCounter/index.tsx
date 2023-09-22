import { theme } from "@ribon.io/shared/styles";
import Heart from "assets/icons/heart.svg";
import { useUserLevel } from "contexts/userLevelContext";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

export type Props = {
  outline?: boolean;
};
function ImpactedLivesCounter({ outline = false }: Props): JSX.Element {
  const { userExperience: impactedLives } = useUserLevel();
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    navigateTo("/impact");
  };

  return (
    <S.Container outline={outline} onClick={handleClick}>
      <S.LivesAmount color={theme.colors.brand.tertiary[300]}>
        {impactedLives}
      </S.LivesAmount>
      <S.Image src={Heart} />
    </S.Container>
  );
}

export default ImpactedLivesCounter;
