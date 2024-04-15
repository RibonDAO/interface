import { theme } from "@ribon.io/shared/styles";
import Icon, { IconProps } from "../../../atomics/Icon";
import Card from "../Card";
import * as S from "./styles";

export type Props = {
  title: string;
  titleColor?: string;
  children: string;
  backgroundColor?: string;
  icon: IconProps;
  iconBackgroundColor: string;
};

const { brand, neutral } = theme.colors;

function CardInfo({
  title,
  titleColor = neutral[800],
  children,
  backgroundColor = brand.primary[25],
  icon,
  iconBackgroundColor = brand.primary[25],
}: Props): JSX.Element {
  return (
    <Card border={false} backgroundColor={backgroundColor} borderRadius={16}>
      <S.InnerCardContainer>
        <S.SubtitleContainer>
          <S.IconContainer iconBackgroundColor={iconBackgroundColor}>
            <Icon {...icon} />
          </S.IconContainer>
          <div style={{ flexShrink: 1, gap: 4 }}>
            <S.Title titleColor={titleColor}>{title}</S.Title>
            <S.ChildrenContainer>{children}</S.ChildrenContainer>
          </div>
        </S.SubtitleContainer>
      </S.InnerCardContainer>
    </Card>
  );
}

export default CardInfo;
