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

function InfoBanner({
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
      data-testid="info-banner"
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

export default InfoBanner;