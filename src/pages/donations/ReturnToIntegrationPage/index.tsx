import { useTranslation } from "react-i18next";
import ticketImage from "assets/images/ticket-image.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { newLogEvent } from "lib/events";
import ArrowLeft from "./assets/arrow-left-dark-green.svg";
import * as S from "./styles";

function ReturnToIntegrationPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.returnToIntegrationPage",
  });
  const { navigateTo, navigateBack } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const handleStayButtonClick = () => {
    navigateTo("/causes");
  };

  const handleReturnButtonClick = () => {
    newLogEvent("click", "backIntegration", { from: "haveTickets_page" });
    window.open(integration?.integrationTask?.linkAddress);
  };

  return (
    <S.Container>
      <S.BackArrowButton
        src={ArrowLeft}
        onClick={navigateBack}
        alt="back-arrow-button"
      />

      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.DefaultImage src={ticketImage} />
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Description>{t("subtitle")}</S.Description>
          </S.TextContainer>
          <S.FilledButton onClick={handleReturnButtonClick}>
            {t("returnButtonText", { integrationName: integration?.name })}
          </S.FilledButton>
          <S.OutlineButton onClick={handleStayButtonClick}>
            {t("stayButtonText", { integrationName: integration?.name })}
          </S.OutlineButton>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default ReturnToIntegrationPage;
