import { useEffect } from "react";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import RibonLogo from "assets/images/logo-ribon.svg";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-sun-shape.svg";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { APP_LINK, RIBON_COMPANY_ID } from "utils/constants";
import extractUrlValue from "lib/extractUrlValue";
import useBreakpoint from "hooks/useBreakpoint";
import theme from "styles/theme";
import { useTickets } from "hooks/useTickets";
import { useTicketsContext } from "contexts/ticketsContext";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import * as S from "./styles";
import Ticket from "./assets/ticket.svg";

function GiveTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.giveTicketPage",
  });
  const { navigateTo } = useNavigation();
  const integrationId = useIntegrationId();
  const { search } = useLocation();
  const externalId = extractUrlValue("external_id", search);
  const { integration } = useIntegration(integrationId);
  const { isMobile } = useBreakpoint();
  const { handleCollect } = useTickets();
  const { refetchTickets } = useTicketsContext();

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  useEffect(() => {
    logEvent("P35_view", { from: integration?.id });
  }, []);

  const handleDownload = () => {
    logEvent("downloadCTA_click", { from: "firstScreen" });

    if (isMobile) {
      window.open(`${APP_LINK}?integration_id=${integrationId}`);
      return;
    }

    navigateTo({
      pathname: "/app-download",
      state: {
        cameFrom: "tickets",
      },
    });
  };

  const handleReceiveTicket = async () => {
    await handleCollect({
      onSuccess: () => {
        setLocalStorageItem(RECEIVED_TICKET_AT_KEY, Date.now().toString());
        setLocalStorageItem(
          RECEIVED_TICKET_FROM_INTEGRATION,
          integrationId?.toString() ?? RIBON_COMPANY_ID,
        );
      },
    });
    refetchTickets();
    logEvent("P35_getTicketBtn_click");
    navigateTo("/causes");
  };

  const title = () => {
    if (!integration) return t("title");

    const integrationName = integration.name;

    if (externalId) return t("integrationTitlePlural", { integrationName });

    if (isRibonIntegration) return t("title");

    return t("integrationTitle", { integrationName });
  };

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <S.MainContainer>
        <S.Header>
          <S.LogosWrapper>
            <S.Logo src={RibonLogo} alt="ribon-logo" />
            {integration && !isRibonIntegration && (
              <>
                <S.ImageContainerText>+</S.ImageContainerText>
                <S.Logo src={integration.logo} alt="integration-logo" />
              </>
            )}
          </S.LogosWrapper>
        </S.Header>
        <S.ContentContainer>
          <S.DefaultImage src={Ticket} />
          <S.TextContainer>
            <S.Title>{title()}</S.Title>
            <S.Description>{t("subtitle")}</S.Description>
          </S.TextContainer>
        </S.ContentContainer>
        <S.ButtonContainer>
          {isMobile ? (
            <>
              <S.FilledButton onClick={handleDownload}>
                {t("downloadAppButton")}
              </S.FilledButton>
              <Button
                text={t("stayInBrowserButton")}
                textColor={theme.colors.brand.primary[600]}
                backgroundColor="transparent"
                borderColor={theme.colors.brand.primary[600]}
                borderRadius="4px"
                onClick={handleReceiveTicket}
              />
            </>
          ) : (
            <S.FilledButton onClick={handleReceiveTicket}>
              {t("nextButton")}
            </S.FilledButton>
          )}
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default GiveTicketPage;
