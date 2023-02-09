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
  refunded?: boolean;
};

const { colors } = theme;

function CardDoubleTextDividerButton({
  firstText,
  mainText,
  rightComplementText,
  buttonText,
  rightComponentButton,
  link,
  processing = false,
  processingText,
  refunded = false,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.FirstText>{firstText}</S.FirstText>
      <S.MainContent processing={processing} refunded={refunded}>
        {mainText}{" "}
        <S.RightMainContent refunded={refunded} processing={processing}>
          {rightComplementText}
        </S.RightMainContent>
      </S.MainContent>
      <Divider color={colors.neutral[200]} />
      {processing ? (
        <S.SpinnerSection href={link}>
          <Spinner />
          {processingText}
        </S.SpinnerSection>
      ) : (
        <S.LinkSection refunded={refunded} href={link}>
          {buttonText} <S.Image src={rightComponentButton} />
        </S.LinkSection>
      )}
    </S.Container>
  );
}

export default CardDoubleTextDividerButton;
