import { useCallback, useEffect } from "react";
import { useIntegrationContext } from "contexts/integrationContext";
import { useLanguage } from "hooks/useLanguage";
import { getMobileOS } from "lib/getMobileOS";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import RibonLogo from "assets/images/logo-ribon.svg";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-sun-shape.svg";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { APP_LINK, RIBON_COMPANY_ID } from "utils/constants";
import useBreakpoint from "hooks/useBreakpoint";
import theme from "styles/theme";
import * as S from "./styles";
import Ticket from "./assets/ticket.svg";

function GiveTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.giveTicketPage",
  });
  const { navigateTo, navigateBack } = useNavigation();
  const {
    currentIntegrationId: integrationId,
    integration,
    ticketsFromIntegration,
  } = useIntegrationContext();
  const { isMobile } = useBreakpoint();
  const { currentLang } = useLanguage();

  const isRibonIntegration = () =>
    integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  useEffect(() => {
    logEvent("P35_view", { from: integration?.id });
  }, []);

  const handleDownload = () => {
    logEvent("downloadCTA_click", {
      from: "firstScreen",
      utmSource: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
      utmMedium: "first_screen",
      utmCampaign: isMobile ? "mobile" : `desktop_${getMobileOS()}`,
    });

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
    logEvent("P35_continuetBtn_click");
    navigateBack();
  };

  const title = useCallback(() => {
    if (!integration) return t("title");

    const integrationName = integration.name;

    if (isRibonIntegration()) return t("title");
    return ticketsFromIntegration > 1
      ? t("integrationTitlePlural", {
          integrationName,
          tickets: ticketsFromIntegration,
        })
      : t("integrationTitle", { integrationName });
  }, [ticketsFromIntegration, integration, isRibonIntegration]);

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <S.MainContainer>
        <S.Header>
          <S.LogosWrapper>
            <S.Logo src={RibonLogo} alt="ribon-logo" />
            {integration && !isRibonIntegration() && (
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
