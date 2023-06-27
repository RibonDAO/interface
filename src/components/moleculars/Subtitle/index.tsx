import Icon, { IconProps } from "components/atomics/Icon";

import * as S from "./styles";

export type Props = {
  text: string | JSX.Element | JSX.Element[];
  color?: string;
  icon: IconProps;
  secondaryColor: string;
  position?: "center" | "start";
};
function Subtitle({
  text,
  color,
  icon,
  secondaryColor,
  position,
}: Props): JSX.Element {
  return (
    <S.Container position={position}>
      <S.IconBox secondaryColor={secondaryColor} position={position}>
        <Icon {...icon} />
      </S.IconBox>
      <S.Subtitle color={color}>{text}</S.Subtitle>
    </S.Container>
  );
}

export default Subtitle;
