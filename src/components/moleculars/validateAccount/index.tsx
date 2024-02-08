import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import ticketImage from "assets/images/ticket-image.svg";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import * as S from "./styles";

export type Props = {
  title: string;
  description: string;
  onContinue: () => void;
  onContinueMagicLink: () => void;
};

function ValidateAccount({
  title,
  description,
  onContinue,
  onContinueMagicLink,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.MainContainer>
        <S.RightImage src={RightImage} />
        <S.LeftImage src={LeftImage} />
        <S.ContentContainer>
          <S.Image src={ticketImage} />
          <S.TextContainer>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.TextContainer>

          <S.ButtonContainer>
            <GoogleLogin onContinue={onContinue} from="validation_flow" />
            <AppleLogin onContinue={onContinue} from="validation_flow" />
            <MagicLinkLogin
              onContinue={onContinueMagicLink}
              from="validation_flow"
            />
          </S.ButtonContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ValidateAccount;
