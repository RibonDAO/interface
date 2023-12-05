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
  isInfiniteAnimation?: boolean;
};

function IconsAroundImage({
  imageSrc = "",
  isStatic = false,
  iconAnimationGreen,
  iconAnimationPink,
  iconAnimationYellow,
  isInfiniteAnimation = true,
}: Props) {
  return (
    <S.Container data-testid="animations-container">
      <S.Icon
        position={0}
        isStatic={isStatic}
        src={iconAnimationPink}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={1}
        isStatic={isStatic}
        src={FlareGreen}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={2}
        isStatic={isStatic}
        src={iconAnimationYellow}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={3}
        isStatic={isStatic}
        src={SparklesPink}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={4}
        isStatic={isStatic}
        src={iconAnimationGreen}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={5}
        isStatic={isStatic}
        src={SparklesYellow}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={6}
        isStatic={isStatic}
        src={iconAnimationPink}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={7}
        isStatic={isStatic}
        src={SparklesGreen}
        isInfinite={isInfiniteAnimation}
      />
      <S.Icon
        position={8}
        isStatic={isStatic}
        src={FlareYellow}
        isInfinite={isInfiniteAnimation}
      />
      <S.Diamond backgroundImage={imageSrc} />
    </S.Container>
  );
}

export default IconsAroundImage;
