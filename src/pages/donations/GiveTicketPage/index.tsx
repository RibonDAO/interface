import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape-red.svg";
import RightImage from "assets/images/top-right-shape.svg";
import useNavigation from "hooks/useNavigation";
import useBreakpoint from "hooks/useBreakpoint";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useIntegration } from "@ribon.io/shared/hooks";
import { APP_LINK, RIBON_COMPANY_ID } from "utils/constants";
import Tooltip from "components/moleculars/Tooltip";
import Button from "components/atomics/buttons/Button";
import { logEvent } from "lib/events";
import { theme } from "@ribon.io/shared/styles";
import { useTicketsContext } from "contexts/ticketsContext";
import RibonLogo from "assets/images/logo-ribon.svg";
import ArrowLeft from "./assets/arrow-left-dark-green.svg";
import Envelope from "./assets/envelope.svg";
import * as S from "./styles";

export type Props = {
  isOnboarding?: boolean;
};

function GiveTicketPage({ isOnboarding = false }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.giveTicketPage",
  });
  const { navigateTo, navigateBack } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const { ticketsCounter } = useTicketsContext();
  const { isMobile } = useBreakpoint();

  const handleClick = () => {
    logEvent("P10_getTicketBtn_click");

    if (isOnboarding) {
      navigateTo("/receive-ticket");
    } else {
      navigateTo("/causes");
    }
  };

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  const titleOnboarding = isRibonIntegration
    ? t("onboardingRibonTitle")
    : t("onboardingIntegrationTitle", {
        integrationName: integration?.name,
      });

  const handleSubtitle = isRibonIntegration
    ? t("subtitle")
    : t("integrationSubtitle", {
        integrationName: integration?.name,
      });

  const subtitle = isOnboarding ? t("onboardingSubtitle") : handleSubtitle;

  const title = isOnboarding ? titleOnboarding : t("title");

  const handleHasAccount = () => {
    logEvent("openAuthBtn_click", { from: "onboarding_page" });
    navigateTo("/auth/sign-in");
  };

  const handleDownload = () => {
    logEvent("downloadCTA_click", { from: "firstScreen" });

    if (isMobile) {
      window.open(APP_LINK);
      return;
    }
    navigateTo({
      pathname: "/app-download",
      state: { cameFrom: "intro" },
    });
  };

  return (
    <S.Container>
      {!isOnboarding && (
        <S.BackArrowButton
          src={ArrowLeft}
          onClick={navigateBack}
          alt="back-arrow-button"
        />
      )}
      <S.MainContainer>
        <S.LeftImage src={LeftImage} />
        <S.RightImage src={RightImage} />

        <S.ContentContainer>
          <S.Header>
            <S.LogosWrapper>
              <S.Logo src={RibonLogo} alt="ribon-logo" />
              {!isRibonIntegration && (
                <>
                  <S.ImageContainerText>+</S.ImageContainerText>
                  <S.Logo src={integration?.logo} alt="integration-logo" />
                </>
              )}
            </S.LogosWrapper>
          </S.Header>
          <S.TextContainer>
            <S.DefaultImage src={Envelope} />
            <S.Title>
              {ticketsCounter > 1
                ? t("titlePlural", { ticketsCounter })
                : title}
            </S.Title>
            <S.Description>{subtitle}</S.Description>
          </S.TextContainer>
          <S.ButtonContainer>
            <S.FilledButton onClick={handleDownload}>
              {t("downloadAppButton")}
            </S.FilledButton>
            <Button
              text={t("stayInBrowserButton")}
              textColor={theme.colors.brand.primary[600]}
              backgroundColor="transparent"
              borderColor={theme.colors.brand.primary[500]}
              borderRadius="4px"
              onClick={handleClick}
            />

            {isOnboarding && (
              <S.Footer>
                <S.MutedText>{t("haveAnAccount")}</S.MutedText>
                <S.ClickableText onClick={handleHasAccount}>
                  {t("signIn")}
                </S.ClickableText>
              </S.Footer>
            )}
          </S.ButtonContainer>
          {!isOnboarding && (
            <S.TooltipSection>
              <Tooltip
                text={t("tooltipTicketText")}
                symbol="?"
                textRight={t("tooltipTicket")}
                place="bottom"
                idTooltip="tooltipTicket"
              />
            </S.TooltipSection>
          )}
        </S.ContentContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default GiveTicketPage;
