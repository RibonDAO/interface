import { useEffect } from "react";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { logEvent } from "lib/events";
import RibonLogo from "assets/images/logo-ribon.svg";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { RIBON_COMPANY_ID } from "utils/constants";
import extractUrlValue from "lib/extractUrlValue";
import theme from "styles/theme";
import Ticket from "./assets/ticket.svg";
import * as S from "./styles";

function GiveTicketV2Page(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.giveTicketV2Page",
  });
  const integrationId = useIntegrationId();
  const { search } = useLocation();
  const externalId = extractUrlValue("external_id", search);
  const { integration } = useIntegration(integrationId);

  useEffect(() => {
    logEvent("P35_view", { from: integration?.id });
  }, []);

  const handleDownload = () => {
    logEvent("downloadCTA_click", { from: "firstScreen" });
  };

  const handleStayBrowser = () => {
    logEvent("P35_getTicketBtn_click");
  };

  const title = () => {
    if (!integration) return t("title");

    const integrationName = integration.name;

    if (externalId) return t("integrationTitlePlural", { integrationName });

    const isRibonIntegration =
      integration.id === parseInt(RIBON_COMPANY_ID, 10);

    if (isRibonIntegration) return t("title");

    return t("integrationTitle", { integrationName });
  };

  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <S.MainContainer>
        <S.ContentContainer>
          <S.Header>
            <S.LogosWrapper>
              <S.Logo src={RibonLogo} alt="ribon-logo" />
              {integration && (
                <>
                  <S.ImageContainerText>+</S.ImageContainerText>
                  <S.Logo src={integration.logo} alt="integration-logo" />
                </>
              )}
            </S.LogosWrapper>
            <S.DefaultImage src={Ticket} />
            <S.TextContainer>
              <S.Title>{title()}</S.Title>
              <S.Description>{t("subtitle")}</S.Description>
            </S.TextContainer>
          </S.Header>

          <S.ButtonContainer>
            <S.FilledButton onClick={handleDownload}>
              {t("downloadAppButton")}
            </S.FilledButton>
            <Button
              text={t("stayInBrowserButton")}
              textColor={theme.colors.brand.primary[600]}
              backgroundColor="transparent"
              borderColor={theme.colors.brand.primary[600]}
              borderRadius="4px"
              onClick={handleStayBrowser}
            />
          </S.ButtonContainer>
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default GiveTicketV2Page;
