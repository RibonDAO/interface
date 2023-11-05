import { useTranslation } from "react-i18next";
import ticketImage from "assets/images/ticket-ribon.svg";
import BackgroundShapes from "assets/images/background-shapes.svg";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";

function ReceiveExtraTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveExtraTicketPage",
  });
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    navigateTo("/causes");
  };

  return (
    <S.Container>
      <S.ContentContainer>
        <S.ImageContainer>
          <S.ImageBackground>
            <S.BackgroundShapes src={BackgroundShapes} />
          </S.ImageBackground>
          <S.MainImage src={ticketImage} />
        </S.ImageContainer>

        <S.TextContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Description>{t("description")}</S.Description>
        </S.TextContainer>
        <S.FilledButton onClick={handleClick}>{t("buttonText")}</S.FilledButton>
      </S.ContentContainer>
    </S.Container>
  );
}

export default ReceiveExtraTicketPage;
