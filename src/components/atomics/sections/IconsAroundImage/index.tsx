import FlareGreen from "assets/icons/flare-green.svg";
import FlareYellow from "assets/icons/flare-yellow.svg";
import SparklesPink from "assets/icons/sparkles-pink.svg";
import SparklesYellow from "assets/icons/sparkles-yellow.svg";
import SparklesGreen from "assets/icons/sparkles-green.svg";
import * as S from "./styles";

export type Props = {
  imageSrc?: string | undefined;
  isStatic?: boolean;
  iconAnimationGreen: string;
  iconAnimationYellow: string;
  iconAnimationPink: string;
};

function IconsAroundImage({
  imageSrc = "",
  isStatic = false,
  iconAnimationGreen,
  iconAnimationPink,
  iconAnimationYellow,
}: Props) {
  return (
    <S.Container data-testid="animations-container">
      <S.Icon position={0} isStatic={isStatic} src={iconAnimationPink} />
      <S.Icon position={1} isStatic={isStatic} src={FlareGreen} />
      <S.Icon position={2} isStatic={isStatic} src={iconAnimationYellow} />
      <S.Icon position={3} isStatic={isStatic} src={SparklesPink} />
      <S.Icon position={4} isStatic={isStatic} src={iconAnimationGreen} />
      <S.Icon position={5} isStatic={isStatic} src={SparklesYellow} />
      <S.Icon position={6} isStatic={isStatic} src={iconAnimationPink} />
      <S.Icon position={7} isStatic={isStatic} src={SparklesGreen} />
      <S.Icon position={8} isStatic={isStatic} src={FlareYellow} />
      <S.Diamond backgroundImage={imageSrc} />
    </S.Container>
  );
}

export default IconsAroundImage;
