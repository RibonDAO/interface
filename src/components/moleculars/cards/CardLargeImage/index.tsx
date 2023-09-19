import { theme } from "@ribon.io/shared/styles";
import ThemeShades from "types/entities/ThemeShades";
import * as S from "./styles";

export type Props = {
  title: string;
  image: string;
  icon?: JSX.Element;
  subtitle?: string;
  description?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  colorTheme?: ThemeShades;
};

const { colors } = theme;

function CardLargeImage({
  title,
  image,
  subtitle,
  icon,
  description,
  buttonText,
  onButtonClick,
  colorTheme = colors.brand.tertiary,
}: Props): JSX.Element {
  return (
    <S.Container colorTheme={colorTheme}>
      <S.Image src={image} alt={title} />
      <S.RightContainer>
        <S.Title colorTheme={colorTheme}>{title}</S.Title>
        <S.Subtitle>
          {icon}
          {subtitle}
        </S.Subtitle>
        <S.Description>{description}</S.Description>
        {buttonText && (
          <S.Button
            colorTheme={colorTheme}
            onClick={onButtonClick}
            text={buttonText}
          />
        )}
      </S.RightContainer>
    </S.Container>
  );
}

export default CardLargeImage;
