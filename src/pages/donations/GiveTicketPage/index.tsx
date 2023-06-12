import { useTranslation } from "react-i18next";
import ticketImage from "assets/images/ticket-image.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import CenterImage from "assets/images/center-shape-background.svg";
import useNavigation from "hooks/useNavigation";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { RIBON_COMPANY_ID } from "utils/constants";
import * as S from "./styles";

function GiveTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.giveTicketPage",
  });
  const { navigateTo } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);

  const receiveTicket = () => {
    navigateTo("/receive-ticket");
  };

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  const title = isRibonIntegration
    ? t("ribonTitle")
    : t("integrationTitle", {
        integrationName: integration?.name,
      });

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <S.ContentContainer>
        {isRibonIntegration ? (
          <S.DefaultImage src={ticketImage} />
        ) : (
          <S.ImageContainer backgroundImage={CenterImage}>
            <S.Image src={integration?.logo} />
          </S.ImageContainer>
        )}
        <S.TextContainer>
          <S.Title>{title}</S.Title>
          <S.Description>{t("subtitle")}</S.Description>
        </S.TextContainer>
        <S.FilledButton onClick={receiveTicket}>{t("button")}</S.FilledButton>
      </S.ContentContainer>
    </S.Container>
  );
}

export default GiveTicketPage;
