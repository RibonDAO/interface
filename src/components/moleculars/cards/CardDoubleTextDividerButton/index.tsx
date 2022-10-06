import theme from "styles/theme";
import Divider from "components/atomics/Divider";
import Spinner from "components/atomics/Spinner";
import * as S from "./styles";

export type Props = {
  firstText: string;
  mainText: string;
  rightComplementText: string;
  buttonText: string;
  rightComponentButton?: string;
  link?: string;
  processing?: boolean;
  processingText?: string;
};

const { colors } = theme;
const { gray20 } = colors;

function CardDoubleTextDividerButton({
  firstText,
  mainText,
  rightComplementText,
  buttonText,
  rightComponentButton,
  link,
  processing = false,
  processingText,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.FirstText>{firstText}</S.FirstText>
      <S.MainContent processing={processing}>
        {mainText}{" "}
        <S.RightMainContent processing={processing}>
          {rightComplementText}
        </S.RightMainContent>
      </S.MainContent>
      <Divider color={gray20} />
      {processing ? (
        <S.SpinnerSection href={link}>
          <Spinner />
          {processingText}
        </S.SpinnerSection>
      ) : (
        <S.LinkSection href={link}>
          {buttonText} <S.Image src={rightComponentButton} />
        </S.LinkSection>
      )}
    </S.Container>
  );
}

export default CardDoubleTextDividerButton;
