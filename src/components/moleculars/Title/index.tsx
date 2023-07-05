import Icon, { IconProps } from "components/atomics/Icon";

import * as S from "./styles";

export type Props = {
  title: string;
  subtitle?: string;
  icon: IconProps;
  secondaryColor: string;
};
function Title({ title, icon, secondaryColor, subtitle }: Props): JSX.Element {
  return (
    <S.Container style={{ alignItems: subtitle ? "flex-start" : "center" }}>
      <S.IconBox secondaryColor={secondaryColor}>
        <Icon {...icon} />
      </S.IconBox>
      <S.TextContainer>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.TextContainer>
    </S.Container>
  );
}

export default Title;
