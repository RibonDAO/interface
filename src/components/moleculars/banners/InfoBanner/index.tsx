import { theme } from "@ribon.io/shared/styles";
import Arrow from "../../../atomics/arrows/Arrow";
import Icon, { IconProps } from "../../../atomics/Icon";
import * as S from "./styles";

const { primary } = theme.colors.brand;

export type TitleProps = {
  text: string;
  size?: string;
  color?: string;
  stylized?: boolean;
};

export type Props = {
  icon?: IconProps;
  squareImage?: string;
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
  squareImage,
  title,
  subtitle,
  text,
  textColor,
  cardBackground,
  backgroundColor = primary[900],
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
      data-testid="banner"
    >
      <S.Content>
        <S.IconText>
          {icon && (
            <S.IconContainer>
              <Icon {...icon} />
            </S.IconContainer>
          )}
          {squareImage && (
            <S.SquareImageContainer>
              <S.SquareImage src={squareImage} />
            </S.SquareImageContainer>
          )}
          <S.TitleContainer>
            {title && (
              <S.Title
                color={title.color}
                size={title.size}
                stylized={title.stylized}
              >
                {title.text}
              </S.Title>
            )}
            {text && <S.Text color={textColor}>{text}</S.Text>}
          </S.TitleContainer>
        </S.IconText>
        {subtitle && (
          <S.Subtitle color={subtitle.color} size={subtitle.size}>
            {subtitle.text}
          </S.Subtitle>
        )}

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

/* <Banner
      title={{
        text: t("title"),
        size: "large",
        color: theme.colors.brand.primary[900],
        stylized: true,
      }}
      squareImage="https://www.figma.com/file/2nXWdjQ4J4juSmHuGNLORL/Estrutura-de-integra%C3%A7%C3%A3o-no-app-nativo?type=design&node-id=653-9124&mode=design&t=9iV5Dj601W8e3GT8-4"
      text={t("text")}
      textColor={theme.colors.neutral[900]}
      backgroundColor={theme.colors.brand.primary[50]}
    /> */
