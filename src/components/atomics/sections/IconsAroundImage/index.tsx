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
  staticIcons?: boolean;
};

function IconsAroundImage({ imageSrc, staticIcons = false }: Props) {
  return (
    <S.Container>
      <S.Icon position={0} src={VolunteerActivismPink} isStatic={staticIcons} />
      <S.Icon position={1} src={FlareGreen} isStatic={staticIcons} />
      <S.Icon
        position={2}
        src={VolunteerActivismYellow}
        isStatic={staticIcons}
      />
      <S.Icon position={3} src={SparklesPink} isStatic={staticIcons} />
      <S.Icon
        position={4}
        src={VolunteerActivismGreen}
        isStatic={staticIcons}
      />
      <S.Icon position={5} src={SparklesYellow} isStatic={staticIcons} />
      <S.Icon position={6} src={VolunteerActivismPink} isStatic={staticIcons} />
      <S.Icon position={7} src={SparklesGreen} isStatic={staticIcons} />
      <S.Icon position={8} src={FlareYellow} isStatic={staticIcons} />
      <S.Diamond backgroundImage={imageSrc} />
    </S.Container>
  );
}

export default IconsAroundImage;
