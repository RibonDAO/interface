import FlareGreen from "assets/icons/flare-green.svg";
import FlareYellow from "assets/icons/flare-yellow.svg";
import SparklesPink from "assets/icons/sparkles-pink.svg";
import SparklesYellow from "assets/icons/sparkles-yellow.svg";
import SparklesGreen from "assets/icons/sparkles-green.svg";
import VolunteerActivismPink from "assets/icons/volunteer-activism-pink.svg";
import VolunteerActivismYellow from "assets/icons/volunteer-activism-yellow.svg";
import VolunteerActivismGreen from "assets/icons/volunteer-activism-green.svg";
import * as S from "./styles";

export type Props = {
  imageSrc: string;
}

function IconsAroundImage({ imageSrc }: Props) {
  return (
    <S.Container>
      <S.Icon src={VolunteerActivismPink} animationName="outer_orbit_1" />
      <S.Icon src={FlareGreen} animationName="outer_orbit_2" />
      <S.Icon src={VolunteerActivismYellow} animationName="outer_orbit_3" />
      <S.Icon src={SparklesPink} animationName="outer_orbit_4" />
      <S.Icon src={VolunteerActivismGreen} animationName="outer_orbit_5" />
      <S.Icon src={SparklesYellow} animationName="outer_orbit_6" />
      <S.Icon src={VolunteerActivismPink} animationName="outer_orbit_7" />
      <S.Icon src={SparklesGreen} animationName="outer_orbit_8" />
      <S.Icon src={FlareYellow} animationName="outer_orbit_9" />
      <S.Diamond backgroundImage={imageSrc} />
    </S.Container>
  );
}

export default IconsAroundImage;