import { theme } from "@ribon.io/shared/styles";
import Arrow from "../../../atomics/arrows/Arrow";
import Icon, { IconProps } from "../../../atomics/Icon";
import * as S from "./styles";

const { primary, secondary } = theme.colors.brand;

export type TitleProps = {
  text: string;
  size?: string;
  color?: string;
};

export type Props = {
  icon?: IconProps;
  title?: TitleProps;
  subtitle?: TitleProps;
  text?: string;
  textColor?: string;
  cardBackground?: string | undefined;
  backgroundColor?: string | undefined;
  children?: JSX.Element | JSX.Element[];
  arrowLinkColor?: string;
  onArrowClick?: () => void;
};

function Banner({
  icon,
  title,
  subtitle,
  text,
  textColor,
  cardBackground,
  backgroundColor = secondary[100],
  children,
  arrowLinkColor = primary[800],
  onArrowClick,
}: Props): JSX.Element {
  const handleClick = () => {
    if (onArrowClick) onArrowClick();
  };

  const flexDirection = onArrowClick ? "row" : "column";

  return (
    <S.Container
      backgroundImage={cardBackground}
      backgroundColor={backgroundColor}
      flexDirection={flexDirection}
      onClick={handleClick}
    >
      <S.Content>
        <S.IconText>
          {icon && (
            <S.IconContainer>
              <Icon {...icon} />
            </S.IconContainer>
          )}
          <S.TitleContainer>
            {title && (
              <S.Title color={title.color} size={title.size}>
                {title.text}
              </S.Title>
            )}
          </S.TitleContainer>
        </S.IconText>
        {subtitle && (
          <S.Subtitle color={subtitle.color} size={subtitle.size}>
            {subtitle.text}
          </S.Subtitle>
        )}

        {text && <S.Text color={textColor}>{text}</S.Text>}
        {children && <S.ChildrenContainer>{children}</S.ChildrenContainer>}
      </S.Content>
      {onArrowClick && (
        <S.ArrowContainer>
          <Arrow
            disabled
            direction="right"
            onClick={handleClick}
            color={arrowLinkColor}
          />
        </S.ArrowContainer>
      )}
    </S.Container>
  );
}

export default Banner;
